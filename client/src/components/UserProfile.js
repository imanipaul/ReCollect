import React from 'react'
import { withRouter } from 'react-router';
import '../stylesheets/UserProfile.css'


class UserProfile extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate(prevProps) {
        if (this.props.user == undefined) {
            console.log('prevprops', prevProps)
        }

    }

    render() {

        return (
            <div className='profile'>
                {this.props.user ?
                    <>
                        <h1 className='greeting-name'>Hello {this.props.user.name}!</h1>
                        {this.props.household &&
                            <h3 className='household-header' onClick={() => ([
                                this.props.history.push(`/household/${this.props.household.id}`)
                            ])}>Household: {this.props.household.name}</h3>
                        }

                        <h4 className='user-items'>Your Items:</h4>
                        {this.props.user.items.map(item => (
                            <p className='item-name' key={item.id}> {item.name}</p>
                        ))}
                    </>
                    :
                    <div>Loading...</div>
                }
            </div>

        )
    }
}


export default withRouter(UserProfile)