import React from 'react'
import { getUser } from '../services/api-helper'
import { withRouter } from 'react-router';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            household: null
        }


        this.getCurrentUser = this.getCurrentUser.bind(this)
    }

    componentDidMount() {
        this.getCurrentUser()
    }

    async getCurrentUser() {
        if (this.props.currentUser != null) {
            const user = await getUser(this.props.currentUser.user_id)
            console.log(user)
            this.setState({ user })
            const household = this.props.households.find(household => (
                household.id == user.id
            ))
            this.setState({ household })
        }
        else {
            console.log('user not found')
            this.props.history.push('/')
        }
    }

    getUserHousehold() {

    }




    render() {
        return (
            <>
                {this.state.user &&
                    <>
                        <h1>Hello {this.state.user.name}!</h1>
                        {this.state.household &&
                            <h3>Household: {this.state.household.name}</h3>
                        }

                        <h4>User Items:</h4>
                        {this.state.user.items.map(item => (
                            <div key={item.id}>{item.name}</div>
                        ))}


                    </>


                }
            </>

        )
    }
}

export default withRouter(UserProfile)