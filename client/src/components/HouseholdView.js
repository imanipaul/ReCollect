import React from 'react'
import { Route, Link } from 'react-router-dom'
import { getHousehold } from '../services/api-helper'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import ItemView from './ItemView';

class HouseholdView extends React.Component {


    componentDidMount() {
        const { id } = this.props.match.params
        this.props.setHousehold(id)
    }


    render() {

        return (
            <>
                <p>Users in this household</p>
                <div className='users'>
                    {this.props.users.map(user => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>

                <p>Items in this household</p>
                <div className='items'>
                    {this.props.items.map(item => (
                        <button key={item.id} onClick={() => {
                            this.props.setItemFormData(item)
                            this.props.history.push(`/item/${item.id}`)
                        }}>{item.name}</button>
                    ))}
                </div>

            </>
        )
    }
}



export default withRouter(HouseholdView)
