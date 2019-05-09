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

                {this.state.isCreate && <CreateItem
                    handleItemFormChange={this.props.handleItemFormChange}
                    itemData={this.props.itemData}
                    createNewItem={this.props.createNewItem} />}

                <button className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create</button>



                {/* <div className='items'>

                    {this.props.items.map(item => (
                        <div key={item.id}>
                            <button onClick={() => {
                                this.props.setItemFormData(item)
                                this.setState({ isRead: item.id })
                            }}>{item.name}</button>
                            {this.state.isRead === item.id ? <ItemView /> : <p>test A</p>}

                        </div>
                    ))}
                </div> */}

                <div className='items'>

                    {this.props.items.map(item => (
                        <>
                            {this.state.isRead === item.id
                                ?
                                <>
                                    <button onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({ isRead: null })
                                    }}>{item.name}</button>
                                    <ItemView
                                        item_id={item.id}
                                        setItem={this.props.setItem}
                                        editItem={this.props.editItem}
                                        itemData={this.props.itemData}
                                        handleItemFormChange={this.props.handleItemFormChange}
                                        item={this.props.item}
                                        category={this.props.category}
                                        user={this.props.user}
                                        deleteItem={this.props.deleteItem}
                                    />
                                </>
                                :
                                <button onClick={() => {
                                    this.props.setItemFormData(item)
                                    this.setState({ isRead: item.id })
                                    // this.props.history.push(`/items/${item.id}`)
                                }}>{item.name}</button>
                            }
                        </>
                    ))}



                </div>





            </>
        )
    }
}



export default withRouter(HouseholdView)
