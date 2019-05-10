import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';


import Login from './components/Login'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import NewHousehold from './components/NewHousehold';
import HouseholdView from './components/HouseholdView';
import ItemView from './components/ItemView';
import UserProfile from './components/UserProfile';
import TestCharts from './components/TestCharts';

import {
  registerUser,
  loginUser,
  getHouseholds,
  createHousehold,
  updateUser,
  getHousehold,
  getCategories,
  updateItem,
  destroyItem,
  createItem,
  getUser
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
        quantity: '',
        purchase_date: '',
        category_id: '',
        user_id: ''
      },
      //full user object
      selectedUser: null
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
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.setUserItemForm = this.setUserItemForm.bind(this)

  }

  componentDidMount() {
    this.getHouseholds()
    this.getCategories()
    const token = localStorage.getItem("jwt")
    console.log('token', token)
    if (token) {
      const userData = decode(token);
      this.setState({
        currentUser: userData
      })
      console.log('userData, ', userData)
      this.selectUser(userData)
    }


  }

  // ----------------------Data Calls-------------------------
  async createNewItem(itemData) {
    const newItem = await createItem(itemData)
    console.log(newItem)
  }

  async deleteItem(item) {
    await destroyItem(item.id);
    this.setState(prevState => ({
      householdItems: prevState.householdItems.filter(el => el.id != item.id)
    }))
    console.log('deleted', item)

  }


  setItem(id) {

    const selectedItem = this.state.householdItems.find(function (item) {
      return item.id === parseInt(id)
    })
    console.log('selectedItem', selectedItem)
    this.setState({ selectedItem })
    this.getUser(selectedItem)
    this.getItemCategory(selectedItem)
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


  async editItem(itemId) {
    const updatedItem = await updateItem(itemId, this.state.itemData)
    console.log('updatedItem', updatedItem)
  }


  setItemFormData(item) {
    this.setState({
      itemData: {
        name: item.name,
        frequency: item.frequency,
        quantity: item.quantity,
        purchase_date: item.purchase_date,
        category_id: item.category_id,
        user_id: item.user_id
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
    return newHouseholdObj
  }

  householdHandleChange(e) {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  async handleNewSubmit() {
    //login
    const userInfo = await loginUser(this.state.authFormData);
    const decodedData = decode(userInfo.token)
    this.setState({
      currentUser: decode(userInfo.token)
    })
    localStorage.setItem("jwt", userInfo.token)

    //create new household
    console.log('creating new household')
    const newHousehold = await this.newHousehold()

    console.log('new household, ', newHousehold)

    //associate user with household
    const userData = {
      household_id: newHousehold.id
    }
    await updateUser(decodedData.user_id, userData)

    //set current user in household
    const user = await getUser(decodedData.user_id)
    console.log('user', user)
    console.log('user household id', user.household_id)
    this.setState({
      householdUser: user
    })

    //set current household
    this.setHousehold(user.household_id)
    this.props.history.push('/profile')
  }

  async selectUser(currentUser) {
    const user = await getUser(currentUser.user_id)
    this.setState({
      selectedUser: user
    })
    this.setHousehold(user.household_id)
  }

  async updateUserData() {
    //login
    const userInfo = await loginUser(this.state.authFormData);
    const decodedData = decode(userInfo.token)
    this.setState({
      currentUser: decode(userInfo.token)
    })
    localStorage.setItem("jwt", userInfo.token)

    //updates user in database with household id
    const userData = {
      household_id: this.state.selectedHouseholdId
    }
    await updateUser(decodedData.user_id, userData)

    //Set the current user for the household
    const user = await getUser(decodedData.user_id)
    console.log('user', user)
    console.log('user household id', user.household_id)
    this.setState({
      householdUser: user
    })

    //Set the current household
    this.setHousehold(user.household_id)
    this.props.history.push('/profile')


  }

  async getCategories() {
    const categories = await getCategories();
    this.setState({ categories })
  }

  setUserItemForm() {
    this.setState({
      itemData: {
        user_id: this.state.currentUser.user_id
      }
    })
  }

  // ----------------------Auth-------------------------
  async handleLogin() {
    const userData = await loginUser(this.state.authFormData);
    const decodedData = decode(userData.token)
    this.setState({
      currentUser: decode(userData.token)
    })
    localStorage.setItem("jwt", userData.token)

    const user = await getUser(decodedData.user_id)
    this.setState({
      householdUser: user
    })

    this.setHousehold(user.household_id)
    this.props.history.push('/profile')
  }


  async handleRegister() {
    const newUser = await registerUser(this.state.authFormData)
    console.log('new user: ', newUser)
    this.setState({ registerUserId: newUser.id })

    // this.handleLogin();
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
        <nav className='logout'>
          {this.state.currentUser
            ?
            <>
              <button className='back-button' onClick={() => (this.props.history.goBack())}>Back</button>

              <p className='greeting' onClick={() => (
                this.props.history.push(`/profile`)
              )}>Hello {this.state.currentUser.name}</p>

              <button className='logout-button' onClick={() => {
                this.handleLogout()
                this.props.history.push('/')
              }}>Logout</button>
            </>
            :
            <div className='login-button'>
              <button className='login-register' onClick={this.handleLoginButton}>Login/register</button>
            </div>
          }

        </nav>
        <Route path="/login" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData}
            handleSelectChange={this.handleSelectChange}
            currentUser={this.state.currentUser}
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
              handleItemFormChange={this.handleItemFormChange}
              itemData={this.state.itemData}
              createNewItem={this.createNewItem}
              setItem={this.setItem}
              editItem={this.editItem}
              itemData={this.state.itemData}
              handleItemFormChange={this.handleItemFormChange}
              item={this.state.selectedItem}
              category={this.state.selectedCategory}
              user={this.state.selectedUser}
              deleteItem={this.deleteItem}
              categories={this.state.categories}
              setUserItemForm={this.setUserItemForm}
            />
          )}
        />

        <Route path='/profile' render={() => (
          <UserProfile
            currentUser={this.state.currentUser}
            user={this.state.selectedUser}
            household={this.state.household}
            households={this.state.households} />
        )}
        />

        {/* <Route path='/charts' component={TestCharts} /> */}


      </div>
    );
  }
}

export default withRouter(App);
