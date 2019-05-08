import React from 'react'
import { Route, Link } from 'react-router-dom'
import { getHousehold } from '../services/api-helper'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import ItemView from './ItemView';
import CreateItem from './CreateItem'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCreate: false
        }
    }


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
                <button onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create</button>
                {this.state.isCreate && <CreateItem
                    handleItemFormChange={this.props.handleItemFormChange}
                    itemData={this.props.itemData}
                    createNewItem={this.props.createNewItem} />}

            </>
        )
    }
}



export default withRouter(HouseholdView)
