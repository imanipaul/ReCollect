import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import CreateItem from './CreateItem'
import Charts from './Charts'
import message from '../images/Asset 197.png'

import bedroom from '../images/bedroom.png'
import expired from '../images/expired.png'
import family from '../images/family.png'
import friends from '../images/friends.png'
import medicine from '../images/medicine.png'
import medicinepills from '../images/medicinepills.png'
import paperclip from '../images/paperclip.png'
import plug from '../images/plug.png'
import question from '../images/question.png'
import sink from '../images/sink.png'
import spraybottle from '../images/spraybottle.png'
import toiletpaper from '../images/toiletpaper.png'
import tools from '../images/tools.png'
import chef from '../images/chef copy.png'
import edit from '../images/edit.svg'
import food from '../images/food.png'
// import question from '../images/question.png'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)
        this.formRef = React.createRef()

        this.state = {
            isCreate: false,
            isRead: false,
            categoryItems: [],
            isCharts: false,
            isEditItem: false,
            iconArray: [expired, chef, toiletpaper, medicine, tools, paperclip, plug, bedroom, spraybottle, food, question]
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

    handleClick = (e) => {
        if (this.node.contains(e.target)) {
            this.setState({ isCreate: true })
        }
        else {
            this.setState({ isCreate: false })
        }
    }


    render() {

        return (
            <>

                <div className='user-wrapper' onClick={() => { this.setState({ isEditItem: false }) }}>
                    <img alt='message image' className='message-image' src={friends} />
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

                {this.props.items.length > 0
                    ?
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
                                        <div className='item-table-cell'>
                                            <button className='item-table-cell' className='edit-item-delete' type='button' onClick={() => {
                                                this.props.deleteItem(item)
                                            }}>Delete</button>
                                        </div>
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
                                        <div className='item-table-cell'>

                                            <button className='item-table-cell' className='edit-item-submit'>Submit</button>
                                        </div>


                                    </>

                                    :
                                    <>
                                        <div className='item-table-cell'><img alt='category icon' className='category-pic' src={this.state.iconArray[item.category_id - 1]} /></div>
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
                                        <div className='item-table-cell' onClick={() => {
                                            this.props.setItemFormData(item)
                                            this.setState({
                                                isEditItem: item.id

                                            })
                                        }}><img alt='edit icon' className='edit-icon' src={edit} /></div>
                                    </>
                                }

                            </form>

                        ))}
                    </section>
                    :
                    <div className='no-items'>No Items Yet!</div>
                }




                < div className='create-item-wrapper' ref={(node => this.node = node)}>
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

                <button onClick={() => {
                    this.setState({ isEditItem: false, isCreate: true })
                }} className='create'>Create Item</button>

            </>
        )
    }
}



export default withRouter(HouseholdView)
