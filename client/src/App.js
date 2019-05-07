import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';

import Login from './components/Login'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import NewHousehold from './components/NewHousehold';
import HouseholdView from './components/HouseholdView';
import ItemView from './components/ItemView';
import EditItem from './components/EditItem';
import UserProfile from './components/UserProfile';

import {
  registerUser,
  loginUser,
  getHouseholds,
  createHousehold,
  updateUser,
  getHousehold,
  getCategories,
  updateItem
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
      householdData: '',
      selectedHouseholdId: '',
      //-----Household View Variables and Item View
      household: null,
      householdUsers: [],
      householdItems: [],
      categories: [],
      //----itemView Selected Item
      selectedItem: null,
      selectedUser: null,
      selectedCategory: null,
      //-----Edit item form
      itemData: {
        name: '',
        frequency: '',
        quantity: ''
      }
    }

    this.handleLogin = this.handleLogin.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.authHandleChange = this.authHandleChange.bind(this)
    this.handleLoginButton = this.handleLoginButton.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.householdHandleChange = this.householdHandleChange.bind(this)
    this.getHouseholds = this.getHouseholds.bind(this)
    this.updateUserData = this.updateUserData.bind(this)
    this.handleNewSubmit = this.handleNewSubmit.bind(this)
    this.newHousehold = this.newHousehold.bind(this)
    this.setHousehold = this.setHousehold.bind(this)
    this.getCategories = this.getCategories.bind(this)
    this.setItemFormData = this.setItemFormData.bind(this)
    this.handleItemFormChange = this.handleItemFormChange.bind(this)
    // this.setSelectedItem = this.setSelectedItem.bind(this)
    this.setItem = this.setItem.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getItemCategory = this.getItemCategory.bind(this)

  }

  componentDidMount() {
    this.getHouseholds()
    this.getCategories()
    const token = localStorage.getItem("jwt")
    if (token) {
      const userData = decode(token);
      this.setState({
        currentUser: userData
      })
    }
  }

  // ----------------------Data Calls-------------------------
  setItem(id) {
    // const { id } = this.props.match.params

    const selectedItem = this.state.householdItems.find(function (item) {
      return item.id === parseInt(id)
    })
    console.log('selectedItem', selectedItem)
    this.setState({ selectedItem })
    // this.props.setSelectedItem(selectedItem)
    this.getUser(selectedItem)
    this.getItemCategory(selectedItem)
    // this.props.setItemFormData(selectedItem)
  }

  getUser(item) {
    const selectedUser = this.state.householdUsers.find(function (user) {
      return user.id == item.user_id
    })
    this.setState({ selectedUser })
  }

  getItemCategory(item) {
    const selectedCategory = this.state.categories.find(function (category) {
      return category.id == item.category_id
    })
    this.setState({ selectedCategory })
  }


  async editItem(itemId, data) {
    const updatedItem = await updateItem(itemId, data)
    console.log('updatedItem', updatedItem)
  }

  setItemFormData(item) {
    console.log('set form item: ', item)
    this.setState({
      itemData: {
        name: item.name,
        frequency: item.frequency,
        quantity: item.quantity
      }
    })
  }

  handleItemFormChange(e) {
    const { name, value } = e.target
    this.setState(prevState => (
      {
        itemData: {
          ...prevState.itemData,
          [name]: value
        }
      }
    ))

  }

  // setSelectedItem(item) {
  //   this.setState({ item })
  // }

  // handleAuthChange(e) {
  //   const { name, value } = e.target
  //   this.setState(prevState => (
  //     {
  //       authForm: {
  //         ...prevState.authForm,
  //         [name]: value
  //       }
  //     }
  //   ))
  // }

  async setHousehold(id) {

    const household = await getHousehold(id)
    console.log('household', household)

    this.setState({
      household: household,
      householdUsers: household.users,
      householdItems: household.items
    })
  }

  async getHouseholds() {
    const households = await getHouseholds();
    this.setState({ households })
  }

  async newHousehold() {
    const data = {
      name: this.state.householdData
    }
    const newHouseholdObj = await createHousehold(data)
    console.log('newHousehold: ', newHouseholdObj)
    this.setState({
      selectedHouseholdId: newHouseholdObj.id
    })
  }

  householdHandleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  async handleNewSubmit() {
    console.log('creating new household')
    await this.newHousehold()
    console.log('updating user')
    await this.updateUserData()
    this.setState({
      selectedHouseholdId: ''
    })
  }

  async updateUserData() {
    const userData = {
      household_id: this.state.selectedHouseholdId
    }
    await updateUser(this.state.currentUser.user_id, userData)

    this.setState({ selectedHouseholdId: '' })
  }

  async getCategories() {
    const categories = await getCategories();
    this.setState({ categories })
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
        <div className='logout'>
          {this.state.currentUser
            ?
            <>

              <p onClick={() => (
                this.props.history.push(`/profile`)
              )}>Hello {this.state.currentUser.name}</p>
              <button onClick={this.handleLogout}>logout</button>
              <button onClick={() => (this.props.history.goBack())}>Back</button>
            </>
            :
            <button onClick={this.handleLoginButton}>Login/register</button>
          }
        </div>
        <Route path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            handleSelectChange={this.handleSelectChange}
          />)} />

        <Route path="/register" render={() => (
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

        <Route path='/add-household' render={() => (
          <NewHousehold
            handleSubmit={this.updateUserData}
            households={this.state.households}
            handleChange={this.householdHandleChange}
            selectedHouseholdId={this.state.selectedHouseholdId}
            currentUser={this.state.currentUser}
            householdData={this.state.householdData}
            handleNewSubmit={this.handleNewSubmit}
          />
        )}
        />

        <Route exact path='/household/:id' render={
          (props) => (
            <HouseholdView
              {...props}
              households={this.state.households}
              setHousehold={this.setHousehold}
              household={this.state.household}
              users={this.state.householdUsers}
              items={this.state.householdItems}
              setItemFormData={this.setItemFormData}

            />
          )}
        />

        <Route path='/item/:id' render={
          (props) => (
            <ItemView
              {...props}
              items={this.state.householdItems}
              users={this.state.householdUsers}
              categories={this.state.categories}
              setItemFormData={this.setItemFormData}
              handleItemFormChange={this.handleItemFormChange}
              setSelectedItem={this.setSelectedItem}
              setItem={this.setItem}
              item={this.state.selectedItem}
              user={this.state.selectedUser}
              category={this.state.selectedCategory}
            />


          )
        }
        />

        <Route path='/profile' render={() => (
          <UserProfile
            currentUser={this.state.currentUser}
            user={this.state.currentUser}
            households={this.state.households} />
        )}
        />
      </div>
    );
  }
}

export default withRouter(App);
