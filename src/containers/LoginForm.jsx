import React from 'react';
import { browserHistory } from 'react-router'

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  usernameChanged = (event) => {
    this.setState({
      username: event.target.value
    });
  };

  passwordChanged = (event) => {
    this.setState({
      password: event.target.value
    });
  };

  login = (event) => {
    event.preventDefault();
    const { username, password } = this.state;

    const apiUrl = process.env.NODE_ENV === "development"
      ? 'http://localhost:3002/login'
      : 'https://daily-api.sparkthecause.com/login';

    fetch(apiUrl, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Could not login');
    }).then(user => {
      const creds = window.btoa(`${username}:${password}`);
      localStorage.setItem('creds', creds);
      browserHistory.push('/editions');
    }).catch(error => {
      alert('Could not login');
    });
  };

  render () {
    const { username, password } = this.state;
    return (
      <div className="loginForm">
        <form>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.usernameChanged} />
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.passwordChanged} />
          <input
            type="submit"
            value="Login"
            onClick={this.login} />
        </form>
      </div>
    );
  }

};

LoginForm.propTypes = {};

export default LoginForm;
