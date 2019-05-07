import React from 'react'

class ItemView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: null,
            user: null,
            category: null,
            isEdit: false

        }

        this.setItem = this.setItem.bind(this)
        this.getUser = this.getUser.bind(this)
    }

    componentDidMount() {
        this.setItem()
    }

    setItem() {
        const { id } = this.props.match.params
        console.log('id:', id)
        console.log('id type: ', typeof (id))

        const selectedItem = this.props.items.find(function (item) {
            return item.id === parseInt(id)
        })
        this.setState({ item: selectedItem })
        this.getUser(selectedItem)
        this.getItemCategory(selectedItem)
    }

    getUser(item) {
        const user = this.props.users.find(function (user) {
            return user.id == item.user_id
        })
        this.setState({ user })
    }

    getItemCategory(item) {
        const category = this.props.categories.find(function (category) {
            return category.id == item.category_id
        })
        this.setState({ category })
    }

    render() {
        return (
            <div>
                {this.state.isEdit
                    ?
                    <>
                        {this.state.item &&

                            <>
                                <form onSubmit={(e) => {
                                    e.preventDefault()
                                }}>
                                    <input value={this.state.item.name} />
                                    <input value={this.state.category.name} placeholder="Category" />
                                    <input value={this.state.item.frequency} placeholder="Frequency of use" />
                                    <input value={this.state.item.purchase_date} placeholder="Purchased on: " />
                                    <input value={this.state.item.quantity} placeholder="Amount: " />
                                    <input value={this.state.user.name} placeholder="User: " />
                                </form>
                            </>
                        }
                    </>

                    :
                    <>
                        {this.state.item &&

                            <>
                                <h1 onClick={() => {
                                    this.setState({ isEdit: true })
                                }}>{this.state.item.name}</h1>
                                <h2 onClick={() => {
                                    this.setState({ isEdit: true })
                                }}>Category: {this.state.category.name} </h2>
                                <h4 onClick={() => {
                                    this.setState({ isEdit: true })
                                }}>Frequency of use: {this.state.item.frequency} times a week</h4>
                                <h4 onClick={() => {
                                    this.setState({ isEdit: true })
                                }}>Purchased on: {this.state.item.purchase_date}</h4>
                                <h4 onClick={() => {
                                    this.setState({ isEdit: true })
                                }}>Amount: {this.state.item.quantity}</h4>
                                <h4 onClick={() => {
                                    this.setState({ isEdit: true })
                                }}>Added by: {this.state.user.name}</h4>
                            </>
                        }
                    </>
                }


            </div>

        )

    }
}

export default ItemView