import React from 'react'

const NewHousehold = (props) => {
    return (
        <div>
            <form>
                <input name='name' type='text' >{props.household_id}</input>
            </form>
        </div>
    )
}

export default NewHousehold