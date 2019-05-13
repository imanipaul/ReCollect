import React from 'react';
import { Route, Link } from 'react-router-dom';
import { withRouter } from 'react-router';


import Login from './components/Login'
import Register from './components/Register'
import LandingPage from './components/LandingPage'
import NewHousehold from './components/NewHousehold';
import HouseholdView from './components/HouseholdView';
import UserProfile from './components/UserProfile';

import home from './images/home.png'

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
    this.setItem = this.setItem.bind(this)
    this.getUser = this.getUser.bind(this)
    this.getItemCategory = this.getItemCategory.bind(this)
    this.editItem = this.editItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.selectUser = this.selectUser.bind(this)
    this.setUserItemForm = this.setUserItemForm.bind(this)
    this.getHouseholdItems = this.getHouseholdItems.bind(this)
    this.matchCategoryItems = this.matchCategoryItems.bind(this)

  }

  async componentDidMount() {
    this.getHouseholds()
    this.getCategories()
    const token = localStorage.getItem("jwt")
    console.log('token', token)
    if (token) {
      const userData = decode(token);
      this.setState({
        currentUser: userData
      })
      this.selectUser(userData)
      const user = await getUser(userData.user_id)
      this.setState({ householdUser: user })
      console.log('sethousehold id', user.household_id)
    }
  }

  // ----------------------Data Calls-------------------------
  async createNewItem(itemData, householdId, categories) {
    const newItem = await createItem(itemData)
    console.log(newItem)
    const newItems = await this.getHouseholdItems(householdId)
    console.log('newItems', newItems)
    this.matchCategoryItems(categories, newItems)

  }

  async deleteItem(item) {
    await destroyItem(item.id);
    this.setState(prevState => ({
      householdItems: prevState.householdItems.filter(el => el.id != item.id)
    }))
    console.log('deleted', item)

    const newItems = await this.getHouseholdItems(this.state.household.id)
    console.log('newItems', newItems)
    this.matchCategoryItems(this.state.categories, newItems)

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


  async editItem(itemId, householdId) {
    const updatedItem = await updateItem(itemId, this.state.itemData)
    console.log('updatedItem', updatedItem)
    const newItems = await this.getHouseholdItems(householdId)
    this.matchCategoryItems(this.state.categories, newItems)
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

  async getHouseholdItems(id) {
    const household = await getHousehold(id)
    this.setState({
      householdItems: household.items
    })
    console.log('updated household items', household.items)

    return household.items

  }

  async setHousehold(id) {

    const household = await getHousehold(id)
    console.log('household', household)



    this.setState({
      household: household,
      householdUsers: household.users,
      householdItems: household.items
    })



    //Match Items to categories for pie chart

    if (this.state.categories) {
      this.matchCategoryItems(this.state.categories, household.items)
    }

  }


  matchCategoryItems(categories, items) {
    console.log('category, items', categories, items)
    const categoryItems = []
    categories.forEach(function (category) {
      const selected = items.filter(item => item.category_id == category.id)
      if (selected.length > 0) {
        const itemsArray = selected.map(item => {
          const itemObj = {}
          itemObj['name'] = item.name;
          itemObj['value'] = item.quantity
          return itemObj
        })
        const categoryStuff = {}
        categoryStuff['category'] = category.name
        categoryStuff['value'] = itemsArray
        categoryItems.push(categoryStuff)
      }
    })
    this.setState({ categoryItems })
    console.log('category items', categoryItems)
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
    console.log('user', user)
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

    this.setState(prevState => (
      {
        itemData: {
          ...prevState.itemData,
          user_id: this.state.currentUser.user_id
        }
      }
    ))

  }



  formatDate(date) {
    const currentDate = new Date(date)
    const month = currentDate.getMonth() + 1
    const day = currentDate.getDate() + 1
    const year = currentDate.getFullYear()
    return `${month}/${day}/${year}`
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
              <img className='home-button' src={home} onClick={() => (this.props.history.push('/'))} />
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
              allData={this.state.categoryItems}
              getHouseholdItems={this.getHouseholdItems}
              formatDate={this.formatDate}
              matchCategoryItems={this.matchCategoryItems}

            />
          )}
        />

        <Route path='/profile' render={() => (
          <UserProfile
            currentUser={this.state.currentUser}
            user={this.state.householdUser}
            household={this.state.household}
            households={this.state.households} />
        )}
        />



      </div>
    );
  }
}

export default withRouter(App);
