import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Login from './components/Login'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import NewHousehold from './components/NewHousehold';


import {
  registerUser,
  loginUser,
  getHouseholds,
  createHousehold,
} from './services/api-helper'

import decode from 'jwt-decode'
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      authFormData: {
        name: '',
        password: '',
      },
      households: [],
      householdData: ''
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.householdHandleChange = this.householdHandleChange.bind(this)
    this.addHousehold = this.addHousehold.bind(this)
    this.getHouseholds = this.getHouseholds.bind(this)
    // this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  componentDidMount() {
    this.getHouseholds()

  }


  // ----------------------Data Calls-------------------------
  async getHouseholds() {
    const households = await getHouseholds();
    this.setState({ households })
  }

  async addHousehold() {
    const newHousehold = await createHousehold(this.state.householdData)
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        household_id: newHousehold.id
      }
    }))
  }

  householdHandleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }



  // ----------------------Auth-------------------------
  async handleLogin() {
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)
    this.props.history.push('/add-household')
  }


  async handleRegister(e) {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    this.handleLogin();
  }

  authHandleChange(e) {
    const { name, value } = e.target
    this.setState(prevState => (
      {
        authFormData: {
          ...prevState.authFormData,
          [name]: value
        }
      }
    ))
  }

  handleLogout() {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
  }

  handleLoginButton() {
    this.props.history.push("/login")
  }


  render() {
    return (
      <div className="App">
        <div>
          {this.state.currentUser
            ?
            <>
              <p>Hello {this.state.currentUser.name}</p>
              <button onClick={this.handleLogout}>logout</button>
            </>
            :
            <button onClick={this.handleLoginButton}>Login/register</button>
          }
        </div>
        <Route exact path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            handleSelectChange={this.handleSelectChange}
          />)} />

        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            allHouseholds={this.state.households}
          />)} />

        <Route exact path='/' render={() => (
          <LandingPage />
        )}
        />

        <Route exact path='/add-household' render={() => (
          <NewHousehold
            handleSubmit={this.addHousehold}
            householdData={this.state.householdData}
            handleChange={this.householdHandleChange}
          />
        )}

        />
      </div>
    );
  }
}

export default withRouter(App);
