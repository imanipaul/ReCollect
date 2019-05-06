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
        // this.setHousehold = this.setHousehold.bind(this)
    }

    componentDidMount() {
        this.setHousehold()

        // const household = setTimeout(() => this.setHousehold(), 1000)
        // console.log('CDM ', household)
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

    // setHousehold() {
    //     const { id } = this.props.match.params
    //     const currentHousehold = this.props.households.find(function (elem) {
    //         return elem.id === parseInt(id)
    //     })
    //     this.setState({
    //         household: currentHousehold
    //     })
    // }

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