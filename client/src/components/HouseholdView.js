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
            isCharts: false
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




                <div className='items'>

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



                </div>
                <button className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create Item</button>







            </>
        )
    }
}



export default withRouter(HouseholdView)
