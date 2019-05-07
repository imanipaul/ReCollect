import React from 'react'
import { getUser } from '../services/api-helper'
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';


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

    render() {
        return (
            <>
                {this.state.user &&
                    <>
                        <h1>Hello {this.state.user.name}!</h1>
                        {this.state.household &&
                            <h3 onClick={() => ([
                                this.props.history.push(`/household/${this.state.household.id}`)
                            ])}>Household: {this.state.household.name}</h3>
                        }

                        <h4>User Items:</h4>
                        {this.state.user.items.map(item => (
                            <p key={item.id}> {item.name}</p>
                        ))}
                    </>
                }
            </>

        )
    }
}

export default withRouter(UserProfile)