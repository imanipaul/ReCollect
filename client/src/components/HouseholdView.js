import React from 'react'
import { Route, Link } from 'react-router-dom'
import { getHousehold } from '../services/api-helper'
import { withRouter } from 'react-router'
import '../stylesheets/HouseholdView.css'
import ItemView from './ItemView';

class HouseholdView extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // household: null,
            // users: [],
            // items: []
        }

        // this.setHousehold = this.setHousehold.bind(this)
    }

    componentDidMount() {
        const { id } = this.props.match.params
        this.props.setHousehold(id)
    }

    // async setHousehold() {
    //     const { id } = this.props.match.params
    //     const household = await getHousehold(id)
    //     console.log('household', household)

    //     this.setState({
    //         household: household,
    //         users: household.users,
    //         items: household.items
    //     })
    //     console.log(this.props.history)
    // }


    render() {

        return (
            <>
                <p>Users in this household</p>
                <div className='users'>
                    {this.props.users.map(user => (
                        <div key={user.id}>{user.name}</div>
                    ))}
                </div>

                <p>Items in this household</p>
                <div className='items'>
                    {this.props.items.map(item => (
                        // <button key={item.id} onClick={() => (
                        //     this.props.history.push(`/item/${item.id}`)
                        // )}>{item.name}</button>

                        <Link to={`/household/${this.props.match.params.id}`} key={item.id}>{item.name}</Link>
                    ))}
                </div>

                <Route path={`/test`} render={() => (
                    <ItemView
                        items={this.state.items}
                    />
                )}
                />
            </>
        )
    }
}

export default withRouter(HouseholdView)
