import React from 'react'
import { withRouter } from 'react-router';
import '../stylesheets/UserProfile.css'


const UserProfile = (props) => {

    return (
        <>
            {props.user &&
                <>
                    <h1>Hello {props.user.name}!</h1>
                    {props.household &&
                        <h3 onClick={() => ([
                            props.history.push(`/household/${props.household.id}`)
                        ])}>Household: {props.household.name}</h3>
                    }

                    <h4>User Items:</h4>
                    {props.user.items.map(item => (
                        <p key={item.id}> {item.name}</p>
                    ))}
                </>
            }
        </>

    )
}


export default withRouter(UserProfile)