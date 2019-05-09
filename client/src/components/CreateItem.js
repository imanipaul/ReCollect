import React from 'react'
import '../stylesheets/CreateItem.css'


class CreateItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }


    render() {
        return (
            <>
                <form className='create-form' onSubmit={(e) => {
                    e.preventDefault()
                    this.props.createNewItem(this.props.itemData)
                }}>
                    <div>Create a new item</div>
                    <div className='form-criteria'>
                        <p>Name: </p>
                        <input name='name' type='text' value={this.props.itemData.name} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Quantity: </p>
                        <input name='quantity' type='text' value={this.props.itemData.quantity} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Frequency: </p>

                        <input name='frequency' type='text' value={this.props.itemData.frequency} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Purchase Date: </p>

                        <input name='purchase_date' type='text' value={this.props.itemData.purchase_date} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>User Id: </p>

                        <input name='user_id' type='text' value={this.props.itemData.user_id} onChange={this.props.handleItemFormChange} />
                    </div>

                    <div className='form-criteria'>
                        <p>Category Id: </p>

                        <input name='category_id' type='text' value={this.props.itemData.category_id} onChange={this.props.handleItemFormChange} />
                    </div>
                    <button>Submit</button>
                </form>
            </>
        )
    }
}

export default CreateItem