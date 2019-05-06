import React from 'react'
import { getHousehold } from '../services/api-helper'
import '../stylesheets/HouseholdView.css'

class HouseholdView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            household: null,
            users: [],
            items: []
        }

        this.setHousehold = this.setHousehold.bind(this)
    }

    componentDidMount() {
        this.setHousehold()
    }

    async setHousehold() {
        const { id } = this.props.match.params
        const household = await getHousehold(id)
        console.log('household', household)

        this.setState({
            household: household,
            users: household.users,
            items: household.items
        })
    }


    render() {

        return (
            <>
                <p>Users in this household</p>
                <div className='users'>
                    {this.state.users.map(user => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>

                <p>Items in this household</p>
                <div className='items'>
                    {this.state.items.map(item => (
                        <div key={item.id}>{item.name}</div>
                    ))}
                </div>
            </>
        )
    }
}

export default HouseholdView
