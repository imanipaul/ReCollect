import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import CreateItem from './CreateItem'
import ItemView from './ItemView'
import Charts from './Charts'


class HouseholdView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isCreate: false,
            isRead: false,
            categoryItems: [],
            isCharts: false
        }
        this.matchCategoryItems = this.matchCategoryItems.bind(this)
    }

    componentDidMount() {
        this.matchCategoryItems()
        this.setState({ isCharts: true })
    }

    matchCategoryItems() {
        const { categories, items } = this.props
        const categoryItems = []

        categories.forEach(function (category) {
            const selected = items.filter(item => item.category_id == category.id)
            if (selected.length > 0) {
                const itemsArray = selected.map(item => {
                    const itemObj = {}
                    itemObj['name'] = item.name;
                    itemObj['value'] = item.quantity
                    return itemObj
                })

                const categoryStuff = {}
                categoryStuff['category'] = category.name
                categoryStuff['value'] = itemsArray
                categoryItems.push(categoryStuff)

            }
        })

        this.setState({ categoryItems })


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
                    createNewItem={this.props.createNewItem}
                    categories={this.props.categories}
                    setUserItemForm={this.props.setUserItemForm} />}

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

                <div>
                    {this.state.isCharts &&

                        <Charts
                            allData={this.state.categoryItems}
                        />
                    }
                </div>





            </>
        )
    }
}



export default withRouter(HouseholdView)
