import React from 'react'
import { withRouter } from 'react-router';
import '../stylesheets/UserProfile.css'


const UserProfile = (props) => {

    return (
        <>
            {props.user &&
                <>
                    <h1 className='greeting-name'>Hello {props.user.name}!</h1>
                    {props.household &&
                        <h3 className='household-header' onClick={() => ([
                            props.history.push(`/household/${props.household.id}`)
                        ])}>Household: {props.household.name}</h3>
                    }

                    <h4 className='user-items'>Your Items:</h4>
                    {props.user.items.map(item => (
                        <p className='item-name' key={item.id}> {item.name}</p>
                    ))}
                </>
            }
        </>

    )
}


export default withRouter(UserProfile)