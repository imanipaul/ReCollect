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
        // this.matchCategoryItems = this.matchCategoryItems.bind(this)
    }



    // matchCategoryItems(categories, items) {

    //     console.log('category, items', categories, items)
    //     const categoryItems = []

    //     categories.forEach(function (category) {
    //         const selected = items.filter(item => item.category_id == category.id)
    //         if (selected.length > 0) {
    //             const itemsArray = selected.map(item => {
    //                 const itemObj = {}
    //                 itemObj['name'] = item.name;
    //                 itemObj['value'] = item.quantity
    //                 return itemObj
    //             })

    //             const categoryStuff = {}
    //             categoryStuff['category'] = category.name
    //             categoryStuff['value'] = itemsArray
    //             categoryItems.push(categoryStuff)

    //         }
    //     })

    //     this.setState({ categoryItems })

    // }


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

                <p className='item-title'>Items in this household</p>

                {this.state.isCreate && <CreateItem
                    handleItemFormChange={this.props.handleItemFormChange}
                    itemData={this.props.itemData}
                    createNewItem={this.props.createNewItem}
                    categories={this.props.categories}
                    setUserItemForm={this.props.setUserItemForm}
                    household={this.props.household} />}

                <button className='create' onClick={() => {
                    this.setState({ isCreate: true })
                }}>Create</button>


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

                {this.props.allData &&
                    <div>


                        <Charts
                            allData={this.props.allData}
                        />

                    </div>
                }





            </>
        )
    }
}



export default withRouter(HouseholdView)
