import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import CreateItem from './CreateItem'
import ItemView from './ItemView'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCreate: false,
            isRead: false
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
                <button className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create</button>
                <div className='items'>
                    {this.props.items.map(item => (
                        <div>
                            <button key={item.id} onClick={() => {
                                this.props.setItemFormData(item)
                                this.setState({ isRead: true })
                                // this.props.history.push(`/item/${item.id}`)
                            }}>{item.name}</button>
                            {this.state.isRead && <ItemView />}

                        </div>
                    ))}
                </div>

                {this.state.isCreate && <CreateItem
                    handleItemFormChange={this.props.handleItemFormChange}
                    itemData={this.props.itemData}
                    createNewItem={this.props.createNewItem} />}



            </>
        )
    }
}



export default withRouter(HouseholdView)
