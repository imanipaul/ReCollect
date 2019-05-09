import React from 'react'

class ItemView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            //conditionals for editing
            isEditName: false,
            isEditCategory: false,
            isEditFrequency: false,
            isEditQuantity: false,

        }
    }

    componentDidMount() {
        this.props.setItem(this.props.item_id)
    }

    render() {
        return (
            <div>
                test

                {this.props.item &&
                    <>
                        {this.state.isEditName
                            ?
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                this.props.editItem(this.props.item_id)
                            }}>
                                <input name='name' type='text' value={this.props.itemData.name} onChange={this.props.handleItemFormChange} />
                                <button>Submit</button>
                            </form>
                            :
                            <h1 onClick={() => {
                                this.setState({
                                    isEditName: true,
                                    isEditCategory: false,
                                    isEditFrequency: false,
                                    isEditQuantity: false,

                                })
                            }}>{this.props.item.name}</h1>
                        }

                        <h4>{this.props.category.name}</h4>


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
                            }}>Frequency of use: {this.props.item.frequency}</h4>
                        }


                        <h4>Purchased on: {this.props.item.purchase_date}</h4>

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

                            }}>Quantity: {this.props.item.quantity}</h4>
                        }
                        <h4>Added by: {this.props.user.name}</h4>
                        <button onClick={() => {
                            this.props.deleteItem(this.props.item)
                            this.props.history.goBack()
                        }}>Delete</button>

                    </>

                }
            </div>
        )
    }
}

export default ItemView