import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import CreateItem from './CreateItem'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCreate: false
        }
    }


    render() {

        return (
            <>
                <p className='users-title'>Users in this household</p>
                <div className='users'>
                    {this.props.users.map(user => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>

                <p className='item-title'>Items in this household</p>
                <div className='items'>
                    {this.props.items.map(item => (
                        <button key={item.id} onClick={() => {
                            this.props.setItemFormData(item)
                            this.props.history.push(`/item/${item.id}`)
                        }}>{item.name}</button>
                    ))}
                </div>
                <button className='create' onClick={() => {
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
