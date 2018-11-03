import React from 'react'
import { Link, navigate} from 'gatsby'
import Helmet from 'react-helmet'
import Waypoint from 'react-waypoint'

import Layout from '../components/layout'
import Header from '../components/Header'
import NavIndex from '../components/NavIndex'
import pic01 from '../assets/images/pic01.jpg'


class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stickyNav: false
    }
  }

  componentDidMount () {

  }

  _handleWaypointEnter= () => {
    this.setState(() => ({ stickyNav: false }));
  }

  _handleWaypointLeave = () => {
    this.setState(() => ({ stickyNav: true }));
  }

  render() {

    return (
      <Layout>
        <Helmet title="Progetto supporto Adolescenti" />

        <Header title="Area Riservata" desc="Piattaforma riservata ai collaboratori"/>

        <Waypoint
          onEnter={this._handleWaypointEnter}
          onLeave={this._handleWaypointLeave}
        >
        </Waypoint>
        <NavIndex sticky={this.state.stickyNav} />

        <div id="main">

          <section id="intro" className="main">
            <div className="spotlight">
              <div className="content">
                <header className="major">
                  <h2>Progetto supporto adolescenti</h2>
                </header>
                <p>Degli adolescenti pongono delle domande in totale anonimato, delle persone qualificate in psicologia o medicina rispondono alle loro domande. Una domanda corrisponde ad una risposta.
                Il tutto viene gestito completamente da remoto ed in maniera asincrona, senza limiti fisici o di tempo, dai il tuo aiuto quando vuoi dove vuoi :)</p>
              </div>
            </div>
          </section>

          <section id="first" className="main special">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Accedi</h2>
              </header>
              <p>Autenticati per accedere alle funzioni della piattaforma</p>
              <ul className="actions">
                <li><Link to="/login" className="button">Accedi</Link></li>
              </ul>
            </div>
          </div>
          </section>

          <section id="second" className="main special">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Registrati</h2>
              </header>
              <p>Entra a far parte del nostro progetto</p>
              <ul className="actions">
                <li><Link to="/signup" className="button">Registrati</Link></li>
              </ul>
            </div>
          </div>
          </section>
          <section id="team" className="main special">
          <div className="spotlight">
            <div className="content">
              <header className="major">
                <h2>Chi siamo</h2>
              </header>
              <p>Un team pieno di persone qualificate e volenterose</p>
              <ul className="actions">
                <li><Link to="/team" className="button">Vai al Team</Link></li>
              </ul>
            </div>
          </div>
          </section>

          <section id="cta" className="main special">
            <header className="major">
              <h2>Contattaci</h2>
              <p>Ti risponderemo appena possibile</p>
            </header>
            <div className="inner">
                        <section>
                        <form name="contact" method="post" action="/success" data-netlify="true" data-netlify-honeypot="bot-field">
                        <input type="hidden" name="bot-field" />
                                <div className="field half first">
                                    <label htmlFor="name">Nome</label>
                                    <input type="text" name="name" id="name" />
                                </div>
                                <div className="field half">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" name="email" id="email" />
                                </div>
                                <div className="field">
                                    <label htmlFor="message">Messaggio</label>
                                    <textarea name="message" id="message" rows="6"></textarea>
                                </div>
                                <ul className="actions">
                                    <li><input type="submit" value="Invia" className="special" /></li>
                                    <li><input type="reset" value="Reset" /></li>
                                </ul>
                            </form>
                        </section>
                    </div>
          </section>

        </div>

      </Layout>
    )
  }
}

export default Index
