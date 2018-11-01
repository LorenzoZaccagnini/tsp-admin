import React from 'react'
import Helmet from 'react-helmet'
import { Link, navigate } from "gatsby"
import Layout from '../components/layout'
import HeaderGeneric from '../components/HeaderGeneric'
import pic04 from '../assets/images/pic04.jpg'

class Generic extends React.Component {
  render() {

    return (
      <Layout>
        <Helmet title="Grazie" />
        <HeaderGeneric title="Grazie" desc="Grazie per averci contattato"/>
        <div id="main">
          <section id="content" className="main">
          <h2>Successo</h2>
            <p>Abbiamo ricevuto la tua mail, ti risponderemo al più presto</p>
            <Link to="/" className="button">Torna alla Home</Link>
            </ section>

        </div>
      </Layout>
    )
  }
}

export default Generic
