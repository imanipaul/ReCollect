import React from 'react'
import { getUser } from '../services/api-helper'
import { withRouter } from 'react-router';


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null
        }


        this.getCurrentUser = this.getCurrentUser.bind(this)
    }

    componentDidMount() {
        this.getCurrentUser()
    }

    async getCurrentUser() {
        // const { user_id } = this.props.currentUser
        if (this.props.currentUser != null) {
            const user = await getUser(this.props.currentUser.user_id)
            console.log(user)
            this.setState({ user })
        }
        else {
            this.props.history.push('/')
        }
    }
    render() {
        return (
            <>
                <div>UserProfile</div>
                {this.state.user ?
                    <>
                        <h1>{this.state.user.name}</h1>
                        <h3>{this.state.user.household_id}</h3>
                    </>
                    :
                    <div>User not loaded</div>


                }
            </>

        )
    }
}

export default withRouter(UserProfile)