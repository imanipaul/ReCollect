import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import CreateItem from './CreateItem'
import ItemView from './ItemView'
import Charts from './Charts'
import message from '../images/Asset 197.png'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCreate: false,
            isRead: false,
            categoryItems: [],
            isCharts: false,
            isEditName: false,
            isEditCategory: false,
            isEditFrequency: false,
            isEditQuantity: false,
        }
        this.toggleCreate = this.toggleCreate.bind(this)
    }

    toggleCreate() {

        this.setState(prevState => ({
            isCreate: !prevState.isCreate
        }))
    }



    render() {

        return (
            <>
                <div className='user-wrapper'>
                    <img className='message-image' src={message} />
                    <div className='user-inner'>
                        <p className='users-title'>Users in this household</p>
                        <div className='users'>
                            {this.props.users.map(user => (
                                <div key={user.id}>{user.name}</div>
                            ))}
                        </div>
                    </div>
                </div>

                <p className='item-title'>Household Pantry</p>

                {this.props.allData &&
                    <div className='charts'>

                        <Charts
                            allData={this.props.allData}
                        />

                    </div>
                }

                {this.state.isCreate && <CreateItem
                    handleItemFormChange={this.props.handleItemFormChange}
                    itemData={this.props.itemData}
                    createNewItem={this.props.createNewItem}
                    categories={this.props.categories}
                    setUserItemForm={this.props.setUserItemForm}
                    household={this.props.household}
                    toggleCreate={this.toggleCreate}
                    getHouseholdItems={this.props.getHouseholdItems} />}











                <div className='items'>

                    {this.props.items.map(item => (
                        <React.Fragment key={item.id}>
                            <div className='item-view'>
                                <h3 onClick={() => this.props.setItemFormData(item)}>{item.name}</h3>


                                {/* <div className='item-view'>
                                <button onClick={() => {
                                    this.props.setItemFormData(item)
                                    this.setState({ isRead: null })
                                }}>{item.name}</button> */}
                                {/* {console.log('props item', item)}
                                <ItemView

                                    item_id={item.id}
                                    setItem={this.props.setItem}
                                    editItem={this.props.editItem}
                                    itemData={this.props.itemData}
                                    handleItemFormChange={this.props.handleItemFormChange}
                                    currentItem={item}
                                    category={this.props.category}
                                    user={this.props.user}
                                    deleteItem={this.props.deleteItem}
                                /> */}


                                <div className='item-view-card'>

                                    {this.state.isEditName
                                        ?
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                            this.props.editItem(item.id)
                                        }}>
                                            <input name='name' type='text' value={this.props.itemData.name} onChange={this.props.handleItemFormChange} />
                                            <button>Submit</button>
                                        </form>
                                        :
                                        <h1 className='item-view-name'
                                        >{item.name}</h1>
                                    }

                                    {/* <h4 className='item-view-category'>{this.props.category.name}</h4> */}


                                    {this.state.isEditFrequency
                                        ?
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                        }}>
                                            <input name='frequency' type='text' value={this.props.itemData.frequency} onChange={this.props.handleItemFormChange} />
                                            <button>Submit</button>
                                        </form>
                                        :
                                        <h4 onClick={() => {
                                            this.setState({
                                                isEditName: false,
                                                isEditCategory: false,
                                                isEditFrequency: true,
                                                isEditQuantity: false,
                                            })
                                        }}>Frequency of use: {item.frequency}</h4>
                                    }


                                    <h4>Purchased on: {item.purchase_date}</h4>

                                    {this.state.isEditQuantity
                                        ?
                                        <form onSubmit={(e) => {
                                            e.preventDefault()
                                        }}>
                                            <input name='quantity' type='text' value={this.props.itemData.quantity} onChange={this.props.handleItemFormChange} />
                                            <button>Submit</button>
                                        </form>
                                        :
                                        <h4 onClick={() => {
                                            this.setState({
                                                isEditName: false,
                                                isEditCategory: false,
                                                isEditFrequency: false,
                                                isEditQuantity: true

                                            })

                                        }}>Quantity: {item.quantity}</h4>
                                    }
                                    <h4>Added by: {this.props.user.name}</h4>
                                    <button className='delete' onClick={() => {
                                        this.props.deleteItem(this.props.item)
                                    }}>Delete</button>



                                    }
            </div>

                            </div>
                        </React.Fragment>
                    ))}



                </div>


                <button className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create</button>







            </>
        )
    }
}



export default withRouter(HouseholdView)
