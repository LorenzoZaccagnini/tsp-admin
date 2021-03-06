import React from 'react'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import HeaderGeneric from '../components/HeaderGeneric'
import pic04 from '../assets/images/pic04.jpg'
import { ACCOUNT_PAGE, SIGNUP_PAGE } from '../components/localization/localization';
import { navigate } from "gatsby"
import { auth } from '../components/firebase'
import  firebase from 'firebase/app';
import 'firebase/database';

class Generic extends React.Component {
  render() {

    return (
      <Layout>
        <Helmet title={SIGNUP_PAGE.it.title} />
        <HeaderGeneric title={SIGNUP_PAGE.it.title} desc={SIGNUP_PAGE.it.desc} />
        <div id="main">
          <section id="content" className="main">
          <h2>{SIGNUP_PAGE.it.title}</h2>
            <SignUpForm />
          </section>
        </div>
      </Layout>
    )
  }
}

const INITIAL_STATE = {
  name: '',
  lastname: '',
  title: '',
  bio: '',
  email: '',
  linkedin: '',
  passwordOne: '',
  passwordTwo: '',
  myuid: 'nana',
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

      const {
        name,
        lastname,
        email,
        title,
        bio,
        linkedin,
        passwordOne,
      } = this.state;

      auth.doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          console.log('my user obj', authUser);
          this.setState({myuid: authUser.uid})
          auth.doSignInWithEmailAndPassword(email, passwordOne).then( res => {
            firebase.database()
            .ref(`users/${authUser.uid}`).set({
              name,
              lastname,
              title,
              bio,
              linkedin,
              avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png',
              public: false,
              approved: false,
              approved_public: 'false_false',
              user_role: 'moderator',
              signup_date: Date.now()
            })
            .then(_ => {
              navigate('/account')
            })

          })


        })
        .catch(error => {
          this.setState(byPropKey('error', error));
        });

        event.stopPropagation();
    }

  render() {
      const {
        name,
        lastname,
        title,
        bio,
        linkedin,
        email,
        passwordOne,
        passwordTwo,
        myuid,
        error,
      } = this.state;

      const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      name === '' ||
      lastname === '' ||
      title === ''

      return (
        <form onSubmit={this.onSubmit}>

          <input
            value={name}
            onChange={event => this.setState(byPropKey('name', event.target.value))}
            type="text"
            placeholder="Nome"
          />
          <input
            value={lastname}
            onChange={event => this.setState(byPropKey('lastname', event.target.value))}
            type="text"
            placeholder="Cognome"
          />
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={title}
            onChange={event => this.setState(byPropKey('title', event.target.value))}
            type="text"
            placeholder="Titolo corto di studio o professione"
            maxLength="30"
          />
          <textarea
            value={bio}
            onChange={event => this.setState(byPropKey('bio', event.target.value))}
            type="text"
            maxLength="650"
            rows="6"
            placeholder={ACCOUNT_PAGE.it.bio_placeholder}
          />
          <input
            value={linkedin}
            onChange={event => this.setState(byPropKey('linkedin', event.target.value))}
            type="text"
            placeholder="Linkedin url"
          />

          <input
            value={passwordOne}
            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit" className="button fix-button">
            {SIGNUP_PAGE.it.btn_register}
          </button>

          { error && <p>{error.message}</p> }
        </form>
      );
    }
}


export default Generic
