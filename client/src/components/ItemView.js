import React from 'react'

class ItemView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: null,
            user: null,
            category: null,
            //conditionals for editing
            isEditName: false,
            isEditCategory: false,
            isEditFrequency: false,
            isEditQuantity: false,
            // isEditPurchased: false,

        }

        // this.setItem = this.setItem.bind(this)
        // this.getUser = this.getUser.bind(this)
    }

    componentDidMount() {
        this.props.setItem(this.props.match.params.id)
    }

    // setItem() {
    //     const { id } = this.props.match.params

    //     const selectedItem = this.props.items.find(function (item) {
    //         return item.id === parseInt(id)
    //     })
    //     this.setState({ item: selectedItem })
    //     this.props.setSelectedItem(selectedItem)
    //     this.getUser(selectedItem)
    //     this.getItemCategory(selectedItem)
    //     this.props.setItemFormData(selectedItem)
    // } 

    // getUser(item) {
    //     const user = this.props.users.find(function (user) {
    //         return user.id == item.user_id
    //     })
    //     this.setState({ user })
    // }

    // getItemCategory(item) {
    //     const category = this.props.categories.find(function (category) {
    //         return category.id == item.category_id
    //     })
    //     this.setState({ category })
    // }



    render() {
        return (
            <div>

                {this.props.item &&
                    <>
                        {this.state.isEditName
                            ?
                            <form>
                                <input name='name' value={this.props.item.name} onChange={this.props.handleItemFormChange} />
                                <button>Submit</button>
                            </form>
                            :
                            <h1 onClick={() => {
                                this.props.setItemFormData()
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
                            <form>
                                <input name='frequency' value={this.props.item.frequency} onChange={this.props.handleItemFormChange} />
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
                            <form>
                                <input name='quantity' value={this.props.item.quantity} onChange={this.props.handleItemFormChange} />
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
                    </>
                }

            </div>

        )

    }
}

export default ItemView