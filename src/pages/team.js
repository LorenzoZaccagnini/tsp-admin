import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import HeaderGeneric from '../components/HeaderGeneric'
import pic04 from '../assets/images/pic04.jpg'
import loadingGif from '../assets/images/loading.gif'
import { db } from '../components/firebase/firebase'

let wh = window.innerHeight / 2
let ww = window.innerWidth / 2


class Team extends React.Component {



  constructor(props) {
  super(props);
  this.state = {
    team: [],
    loading: true
  }
  this.loadTeam = this.loadTeam.bind(this)

}

  componentDidMount () {
    this.loadTeam()

  }



  loadTeam = () => {
    db.ref("users")
    .orderByChild('approved_public').equalTo('true_true')
    .once('value')
    .then(snapshot => {
      let list = [];
      for(var key in snapshot.val()){
        let tempObj = snapshot.val()[key];
        tempObj.key = key;
        if (tempObj.approved) {
          list.push(tempObj)
        }
      }
      this.setState({
        team: list,
        loading: false
      })
    })
  }


  render() {

    return (
      <Layout>
        <Helmet title="Il nostro team" />
        <HeaderGeneric title="Chi siamo" desc="Qualificati e volenterosi"/>
        <div id="main">
          <section id="content" className="main">
            {this.state.loading &&
              <div align="center">
              <img src={loadingGif} />
              </div>
            }
            {this.state.team != [] &&
            <div>
            {this.state.team.map( el  =>
              <div className="manage_team_box public_team">
              <div className="image_box">
              <img src={el.avatarURL}
              alt="" className="manage_team_img"/>
              <h3>{el.name} {el.lastname}</h3>
              </div>
              <div className="info_box">
              <div className="title_box">{el.title}</div>
              <div className="bio_box">{el.bio}</div>
              </div>
              </div>
            )}
            </div>
          }
          </section>
        </div>
      </Layout>
    )
  }
}

export default Team
