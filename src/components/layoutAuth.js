import React from 'react'
import '../assets/scss/main.scss'
import { firebase } from './firebase';

import Footer from './Footer'

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: 'is-loading',
      authUser: null,

    }
  }

  componentDidMount () {
    firebase.auth.onAuthStateChanged(authUser => {
      console.log('authenticated');
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
    this.timeoutId = setTimeout(() => {
        this.setState({loading: ''});
    }, 100);
  }

  componentWillUnmount () {
    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
    }
  }

  render() {
    const { children } = this.props

    return (
      <div className={`body ${this.state.loading}`}>
      {
        this.props.reqAuth && this.state.authUser != null &&
        <div id="wrapper">
          {children}

          <Footer />
        </div>
      }
      </div>
    )
  }
}

export default Template
