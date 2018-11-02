import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'
import Modal from 'react-modal';

import Layout from '../components/layoutAuth'
import Header from '../components/Header'
import NavAccount from '../components/NavAccount'
import pic01 from '../assets/images/pic01.jpg'
import { ACCOUNT_PAGE } from '../components/localization/localization';
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import  firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const customStyles = {
  content : {
    top                   : '50%',
    backgroundColor       : 'steelblue',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  }
};

const INITIAL_STATE = {
  uid: null,
  authUser: null,
  stickyNav: false,
  name: '',
  lastname: '',
  title: '',
  bio: '',
  email: '',
  linkedin: '',
  public: null,
  error: null,
  isUploading: false,
  progress: 0,
  avatar: null,
  avatarURL: pic01,
  approved: false,
  modalIsOpen: false,
};

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
    this.changeVisibility = this.changeVisibility.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null});
        if (this.state.authUser !== null) {
          console.log('auth is: ', this.state.authUser);
          firebase.database().ref(`users/${this.state.authUser.uid}`).once('value')
          .then(info => {
            const userTempInfo = info.val()
            this.setState({
            uid: authUser.uid,
            name: userTempInfo.name,
            lastname: userTempInfo.lastname,
            title: userTempInfo.title,
            bio: userTempInfo.bio,
            linkedin: userTempInfo.linkedin,
            public: userTempInfo.public,
            avatarURL: userTempInfo.avatarURL,
            approved: userTempInfo.approved
          })
            console.log(info.val());
            console.log(this.state.uid);
          })
        }
    });
  }

  _handleWaypointEnter= () => {
    this.setState(() => ({ stickyNav: false }));
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }));
  }

  onSubmit = (event) => {
    event.preventDefault();
    console.log(event.target);
      const {
        name,
        lastname,
        email,
        title,
        bio,
        linkedin,
        passwordOne,
        avatarURL
      } = this.state;

            firebase.database()
            .ref(`users/${this.state.uid}`).update({
              name,
              lastname,
              title,
              bio,
              linkedin,
              avatarURL
            })
            .then(_ => {
              console.log('success bio');
              this.setState({modalIsOpen: true});
            })
            .catch(error => {
              this.setState(byPropKey('error', error));
            });
            event.stopPropagation();
    }

    openModal() {
  this.setState({modalIsOpen: true});
}

afterOpenModal() {
  // references are now sync'd and can be accessed.
  this.subtitle.style.color = '#f00';
}

closeModal() {
  this.setState({modalIsOpen: false});
}

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });
  handleProgress = progress => this.setState({ progress });
  handleUploadError = error => {
    console.log('error upload');
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    console.log('begin upload');
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref(`${this.state.uid}`)
      .child(filename)
      .getDownloadURL()
      .then(url =>
        {
          console.log('the url is: ', url);
      this.setState({ avatarURL: url })
        firebase.database()
        .ref(`users/${this.state.uid}`).update({
          avatarURL: url
        })
        .then(_ => {
          console.log('success avatarchange');
        })}
      )
      .catch( err => console.log('err: ', err))

  };

  changeVisibility = (publicProfile) => {
    firebase.database()
    .ref(`users/${this.state.uid}`).update({
      public: publicProfile
    })
    .then(_ => {
      this.setState({public: publicProfile})
      console.log('success viz');
    })
  }

  render() {

    const {
      authUser,
      stickyNav,
      name,
      lastname,
      title,
      bio,
      email,
      linkedin,
      avatarURL,
      error,
      approved
    } = this.state;

    const isInvalid =
    name === '' ||
    lastname === '' ||
    title === ''



    return (

      <Layout reqAuth="true">
      <Modal
                 isOpen={this.state.modalIsOpen}
                 onAfterOpen={this.afterOpenModal}
                 onRequestClose={this.closeModal}
                 style={customStyles}
                 contentLabel="Successo"
               >

                <div className="modal_success">
                 <h2 className="modal_title" ref={subtitle => this.subtitle = subtitle}>Successo</h2>
                 <button
                 onClick={this.closeModal}>OK</button>
                 </div>
        </Modal>
        <div>

        <Helmet title="Il tuo account" />
        { this.state.lastname != null &&
        <Header title={'Ciao ' + this.state.name } desc="Utilizza questa pagina per modificare la tua biografia o cambiare la foto" />
        }
        { this.state.lastname == null &&
        <Header title="Ciao" desc="Utilizza questa pagina per modificare la tua biografia o cambiare la foto" />
        }
        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        >
        </Waypoint>
        <NavAccount sticky={this.state.stickyNav} />
        { this.state.lastname != null &&

          <div id="main">

          <section id="intro" className="main">
          <form onSubmit={this.onSubmit}>

            <div className="spotlight">
              <div className="content">
                <header className="major">
                <input
                  value={title}
                  onChange={event => this.setState(byPropKey('title', event.target.value))}
                  type="text"
                  className="title_input"
                  placeholder='Titolo corto di studio o professione'
                  maxLength="30"
                />
                </header>
                <div className="name_input_container">
                <p className="label">Il tuo profilo {this.state.approved && 'è stato approvato'} {!this.state.approved && 'non è ancora stato approvato'}</p>

                <input
                  value={name}
                  onChange={event => this.setState(byPropKey('name', event.target.value))}
                  type="text"
                  className="account_input"
                  placeholder="Nome"
                />
                <input
                  value={lastname}
                  onChange={event => this.setState(byPropKey('lastname', event.target.value))}
                  type="text"
                  className="account_input"
                  placeholder="Cognome"
                />

                <p className="label">La tua biografia</p>
                <textarea
                  value={bio}
                  onChange={event => this.setState(byPropKey('bio', event.target.value))}
                  type="text"
                  placeholder= {ACCOUNT_PAGE.it.bio_placeholder}
                />
                </ div>
                <p className="label">Il tuo linkedin</p>
                <input
                  value={linkedin}
                  onChange={event => this.setState(byPropKey('linkedin', event.target.value))}
                  type="text"
                  className="bottom_border_input"
                  placeholder="Inserisci la url del tuo linkedin"
                />
                <ul className="actions">
                  <li>
                  <button type="submit"  disabled={isInvalid} className="bluebtn button fix-button">
                  Salva</button></li>
                </ul>
                { this.state.error && <p>{this.state.error.message}</p> }
                </div>
              <div className="avatarBox" align="center">
              <span className="image"><img src={avatarURL} alt="" /></span>
              <CustomUploadButton
                accept="image/*"
                maxHeight='512'
                maxWidth='512'
                filename={file => this.state.uid }
                storageRef={firebase.storage().ref(`${this.state.uid}`)}
                onUploadStart={this.handleUploadStart}
                onUploadError={this.handleUploadError}
                onUploadSuccess={this.handleUploadSuccess}
                onProgress={this.handleProgress}
                style={{backgroundColor: 'steelblue', color: 'white', padding: 10, borderRadius: 4, textAlign: 'center', width: '200px'}}
              >
                Cambia
              </CustomUploadButton>
              </div>
            </div>
            </form>

          </section>

          <section id="first" className="main special">
            <header className="major">
              <h2>Visibilità: {this.state.public && 'pubblico'} {!this.state.public && 'privato'}</h2>
            </header>
            <ul className="features">
              <li>
                <span className="icon major style1 fa-eye"
                onClick={() => this.changeVisibility(true)}
                 style={this.state.public ? {'backgroundColor': '#E3E3E3'} : {}}></span>
                <h3>Pubblico</h3>
                <p>Voglio far parte del team pubblicamente</p>
              </li>
              <li>
                <span className="icon major style3 fa-eye-slash"
                onClick={() => this.changeVisibility(false)}
                style={!this.state.public ? {'backgroundColor': '#E3E3E3'} : {}}
                ></span>
                <h3>Privato</h3>
                <p>Il mio profilo non è visibile pubblicamente.</p>
              </li>
            </ul>
          </section>

          <section id="second" className="main special">
            <header className="major">
              <h2>Cambia password</h2>
              <p>Inserisci la tua email per cambiare la password</p>
            </header>
            <form onSubmit={this.onSubmitChangePwd}>
              <input
                value={this.state.email}
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="text"
                placeholder="Email Address"
                className="bottom_border_input"
              />
              <footer className="major">
                <ul className="actions">
                  <li><button type="submit" className="button fix-button">
                  Cambia password
                  </button></li>
                </ul>
              </footer>

              { this.state.error && <p>{this.state.error.message}</p> }
            </form>

          </section>


          </div>
        }

        </div>

      </Layout>

    )
  }
}

export default Index
