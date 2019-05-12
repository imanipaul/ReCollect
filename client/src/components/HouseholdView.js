import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import CreateItem from './CreateItem'
import Charts from './Charts'
import message from '../images/Asset 197.png'
import kitchen from '../images/chef.png'
import food from '../images/food.svg'
import bathroom from '../images/bathroom.svg'
import bedroom from '../images/bedroom.svg'
import electronics from '../images/electronics.svg'
import office from '../images/office.svg'
import perishable from '../images/perishable.svg'
import tool from '../images/tool.svg'
import misc from '../images/misc.svg'
import cleaning from '../images/cleaning.svg'
import edit from '../images/edit.svg'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef()

        this.state = {
            isCreate: false,
            isRead: false,
            categoryItems: [],
            isCharts: false,
            isEditItem: false
        }
        this.toggleCreate = this.toggleCreate.bind(this)
    }

    componentDidMount() {
        this.createIconArray(perishable, kitchen, bathroom, kitchen, tool, office, electronics, bedroom, cleaning, food, misc)
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

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            this.setState({ isCreate: true })
        }
        else {
            this.setState({ isCreate: false })
        }
    }

    createIconArray(icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11) {
        const iconArray = []
        iconArray.push(icon1, icon2, icon3, icon4, icon5, icon6, icon7, icon8, icon9, icon10, icon11)
        this.setState({ iconArray })
    }



    render() {

        return (
            <>
                <div className='user-wrapper' onClick={() => { this.setState({ isEditItem: false }) }}>
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
                    <div onClick={() => { this.setState({ isEditItem: false }) }} className='charts'>

                        <Charts
                            allData={this.props.allData}
                        />

                    </div>
                }

                <div className='separation'>

                </div>

                <div >
                    {this.state.isCreate && <CreateItem
                        handleItemFormChange={this.props.handleItemFormChange}
                        itemData={this.props.itemData}
                        createNewItem={this.props.createNewItem}
                        categories={this.props.categories}
                        setUserItemForm={this.props.setUserItemForm}
                        household={this.props.household}
                        toggleCreate={this.toggleCreate}
                        getHouseholdItems={this.props.getHouseholdItems}
                        handleClick={this.handleClick}
                        matchCategoryItems={this.props.matchCategoryItems}
                        items={this.props.items} />}
                </div>

                <section className='item-table' >
                    <header className='table-row-header'>
                        <div className='item-table-cell'> .</div>
                        <div className='item-table-cell'>Name</div>
                        <div className='item-table-cell'>Quantity</div>
                        <div className='item-table-cell'>Date Purchased</div>
                        <div className='item-table-cell'>Purchased By</div>
                        <div className='item-table-cell'> .</div>
                    </header>
                    {this.props.items.map((item, index) => (

                        <form key={item.id} className='table-row-form' onSubmit={(e) => {
                            e.preventDefault()
                            this.props.editItem(item.id, this.props.match.params.id)
                            this.setState({ isEditItem: false })
                            this.props.matchCategoryItems(this.props.categories, this.props.items)
                        }} >

                            {this.state.isEditItem === item.id
                                ?
                                <>
                                    <button type='button' onClick={() => {
                                        this.props.deleteItem(item)
                                    }}>Delete</button>
                                    <div className='item-table-cell'>
                                        <input name='name' type='text' value={this.props.itemData.name} onChange={this.props.handleItemFormChange} />

                                    </div>
                                    <div className='item-table-cell'>
                                        <input name='quantity' type='text' value={this.props.itemData.quantity} onChange={this.props.handleItemFormChange} />
                                    </div>
                                    <div className='item-table-cell'>
                                        <input name='purchase_date' type='date' value={this.props.itemData.purchase_date} onChange={this.props.handleItemFormChange} />
                                    </div>
                                    <div className='item-table-cell'>{this.getItemUser(item.user_id)}</div>
                                    <button>Submit</button>


                                </>

                                :
                                <>
                                    <div className='category-pic'><img src={this.state.iconArray[item.category_id - 1]} /></div>
                                    <p className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{item.name}</p>

                                    <p className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{item.quantity}</p>

                                    <p className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{this.props.formatDate(item.purchase_date)}</p>

                                    <p className='item-table-cell' onClick={() => {
                                        this.props.setItemFormData(item)
                                        this.setState({
                                            isEditItem: item.id

                                        })
                                    }}>{this.getItemUser(item.user_id)}</p>
                                    <div><img src={edit} /></div>
                                </>
                            }

                        </form>

                    ))}
                </section>

                <button onClick={() => { this.setState({ isEditItem: false }) }} className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create Item</button>

            </>
        )
    }
}



export default withRouter(HouseholdView)
