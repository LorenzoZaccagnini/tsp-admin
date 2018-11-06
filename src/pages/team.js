import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import HeaderGeneric from '../components/HeaderGeneric'
import pic04 from '../assets/images/pic04.jpg'
import { db } from '../components/firebase/firebase'


class Team extends React.Component {

  constructor(props) {
  super(props);
  this.state = {
    team: [],
  }
  this.loadTeam = this.loadTeam.bind(this)

}

  componentDidMount () {
    this.loadTeam()
  }

  loadTeam = () => {
    db.ref("users")
    .orderByChild('public').equalTo(true)
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
        team: list
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
