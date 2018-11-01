import React from 'react'
import Helmet from 'react-helmet'
import { Link, navigate } from "gatsby"

import Layout from '../components/layout'
import HeaderGeneric from '../components/HeaderGeneric'
import pic04 from '../assets/images/pic04.jpg'
import { auth } from '../components/firebase'
class Generic extends React.Component {
  render() {

    return (
      <Layout>
        <Helmet title="Login" />
        <HeaderGeneric title="Login" desc="Autenticati per proseguire"/>
        <div id="main">
          <section id="content" className="main">
            <h2>Login</h2>
            <SignInForm />
            <Link to="/signup" >Clicca qui per registrarti</Link>
          </section>
        </div>
      </Layout>
    )
  }
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    event.preventDefault();

    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then((res) => {
        this.setState({ ...INITIAL_STATE });
        console.log('success');
        navigate('/account')
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
      event.stopPropagation();

  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={email}
          onChange={event => this.setState(byPropKey('email', event.target.value))}
          type="text"
          placeholder="Email Address"
        />
        <input
          value={password}
          onChange={event => this.setState(byPropKey('password', event.target.value))}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit" className="button fix-button">
          Login
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default Generic
