import React from 'react'
import { withRouter } from 'react-router'
import '../stylesheets/CreateItem.css'


class CreateItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    componentDidMount() {
        this.props.setUserItemForm()
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.props.handleClick, false)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.props.handleClick, false)
    }


    render() {
        return (
            <>
                <form className='create-form' onSubmit={(e) => {
                    e.preventDefault()
                    this.props.createNewItem(this.props.itemData, this.props.household.id)
                    this.props.toggleCreate()
                    // console.log('running match cateogry items')
                    // this.props.matchCategoryItems(this.props.categories, this.props.items)
                }}>
                    <div className='create-title'>Create a new item</div>
                    <div className='form-criteria'>
                        <p>Name: </p>
                        <input name='name' type='text' value={this.props.itemData.name} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Quantity: </p>
                        <input name='quantity' type='text' value={this.props.itemData.quantity} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Purchase Date: </p>

                        <input name='purchase_date' type='date' value={this.props.itemData.purchase_date} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Category: </p>

                        <select name='category_id' onChange={this.props.handleItemFormChange}>
                            {this.props.categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>

                    </div>
                    <button>Submit</button>
                </form>
            </>
        )
    }
}

export default withRouter(CreateItem)