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
            isEditItem: false
        }
        this.toggleCreate = this.toggleCreate.bind(this)
    }

    toggleCreate() {

        this.setState(prevState => ({
            isCreate: !prevState.isCreate
        }))
    }

    getItemUser(id) {
        const selectedUser = this.props.users.find(user => user.id === id)
        return selectedUser.name
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

                <div className='separation'>

                </div>

                {this.state.isCreate && <CreateItem
                    handleItemFormChange={this.props.handleItemFormChange}
                    itemData={this.props.itemData}
                    createNewItem={this.props.createNewItem}
                    categories={this.props.categories}
                    setUserItemForm={this.props.setUserItemForm}
                    household={this.props.household}
                    toggleCreate={this.toggleCreate}
                    getHouseholdItems={this.props.getHouseholdItems} />}

                <section className='item-table'>
                    <header className='table-row-header'>
                        <div className='item-table-cell'>Item Name</div>
                        <div className='item-table-cell'>Item Quantity</div>
                        <div className='item-table-cell'>Item Date Purchased</div>
                        <div className='item-table-cell'>Item User</div>
                    </header>
                    {this.props.items.map(item => (
                        // <div className='item-table-row'>

                        <form className='table-row-form' onSubmit={(e) => {
                            e.preventDefault()
                            this.props.editItem(item.id, this.props.match.params.id)
                            this.setState({ isEditItem: false })
                            // this.props.getHouseholdItems(this.props.match.params.id)
                        }}>

                            {this.state.isEditItem === item.id
                                ?
                                <>
                                    <div className='item-table-cell'>
                                        <input name='name' type='text' value={this.props.itemData.name} onChange={this.props.handleItemFormChange} />

                                    </div>
                                    <div className='item-table-cell'>
                                        <input name='quantity' type='text' value={this.props.itemData.quantity} onChange={this.props.handleItemFormChange} />
                                    </div>
                                    <div className='item-table-cell'>
                                        <input name='purchase_date' type='date' value={this.props.itemData.purchase_date} onChange={this.props.handleItemFormChange} />
                                    </div>
                                    <div className='item-table-cell'>{item.user_id}</div>
                                    <button>Submit</button>

                                </>

                                :
                                <>
                                    <h4 className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{item.name}</h4>

                                    <h4 className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{item.quantity}</h4>

                                    <h4 className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{this.props.formatDate(item.purchase_date)}</h4>

                                    <h4 className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{this.getItemUser(item.user_id)}</h4>
                                </>
                            }

                            {/* <div className='item-table-cell'>{item.quantity}</div>
                            <div className='item-table-cell'>{item.purchase_date}</div>
                            <div className='item-table-cell'>{item.user_id}</div> */}

                        </form>

                    ))}





                </section>



                {/* <div className='items'>
                    {this.props.items.map(item => (
                        <React.Fragment key={item.id}>
                            {this.state.isRead === item.id
                                ?
                                <div className='item-view'>
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
                                </div>
                                :
                                <button onClick={() => {
                                    this.props.setItemFormData(item)
                                    this.setState({ isRead: item.id })
                                }}>{item.name}</button>
                            }
                        </React.Fragment>
                    ))}
                </div> */}


                <button className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create Item</button>







            </>
        )
    }
}



export default withRouter(HouseholdView)
