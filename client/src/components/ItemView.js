import React from 'react'

class ItemView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            item: null,
            user: null,
            category: null

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

        console.log('selected item', selectedItem)

        this.setState({ item: selectedItem })
        console.log('current state', this.state.item)
        this.getUser(selectedItem)
        this.getItemCategory(selectedItem)
    }

    getUser(item) {
        const user = this.props.users.find(function (user) {
            return user.id == item.user_id
        })
        console.log(user)
        this.setState({ user })
    }

    getItemCategory(item) {
        const category = this.props.categories.find(function (category) {
            return category.id == item.category_id
        })

        console.log('category', category)
        this.setState({ category })
    }

    render() {

        return (

            <div>

                {this.state.item &&
                    <>
                        <h1>{this.state.item.name}</h1>
                        <h2>Category: {this.state.category.name} items</h2>
                        <h4>Frequency of use: {this.state.item.frequency} times a week</h4>
                        <h4>Purchased on: {this.state.item.purchase_date}</h4>
                        <h4>Amount: {this.state.item.quantity}</h4>
                        <h4>Added by: {this.state.user.name}</h4>
                    </>
                }
                item view
            </div>

        )

    }
}

export default ItemView