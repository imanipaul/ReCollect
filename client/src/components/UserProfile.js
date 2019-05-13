import React from 'react'
import { withRouter } from 'react-router';
import '../stylesheets/UserProfile.css'


class UserProfile extends React.Component {

    componentDidUpdate(prevProps) {
        if (this.props.user === undefined) {
            console.log('prevprops', prevProps)
        }

    }

    render() {

        return (
            <div className='profile'>
                {this.props.user ?
                    <>
                        <div className='about'>
                            <h1 className='greeting-name'>About {this.props.user.name}:</h1>
                            {this.props.household &&
                                <h3 className='household-header' onClick={() => ([
                                    this.props.history.push(`/household/${this.props.household.id}`)
                                ])}>Household: {this.props.household.name}</h3>
                            }
                        </div>
                        <div className='border-line'>

                        </div>
                        <div className='profile-items'>
                            <h4 className='user-items'>Your Items:</h4>
                            {this.props.user.items.length > 0
                                ?
                                <div className='all-profile-items'>
                                    {this.props.user.items.map(item => (
                                        <li className='item-name' key={item.id}> {item.name}</li>
                                    ))}
                                </div>
                                :
                                <div>You don't have any yet!</div>
                            }



                        </div>
                    </>
                    :
                    <div>Loading...</div>
                }
            </div>

        )
    }
}


export default withRouter(UserProfile)