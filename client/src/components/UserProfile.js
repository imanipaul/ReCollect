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
            // this.setState({ household })
        }
        else {
            console.log('user not found')
            this.props.history.push('/')
        }
    }

    render() {
        return (
            <>
                {this.props.user &&
                    <>
                        <h1>Hello {this.props.user.name}!</h1>
                        {this.props.household &&
                            <h3 onClick={() => ([
                                this.props.history.push(`/household/${this.props.household.id}`)
                            ])}>Household: {this.props.household.name}</h3>
                        }

                        <h4>User Items:</h4>
                        {this.props.user.items.map(item => (
                            <p key={item.id}> {item.name}</p>
                        ))}
                    </>
                }
            </>

        )
    }
}

export default withRouter(UserProfile)