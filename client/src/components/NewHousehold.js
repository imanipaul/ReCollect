import React from 'react'

export default class NewHousehold extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isJoin: null
        }
    }



    render() {
        return (
            <div>
                {/* <p>New Household</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.handleSubmit()
            }}>
                <p>Name</p>
                <input name='householdData' type='text' value={props.householdData} onChange={props.handleChange} />
                <button>Submit</button>
            </form> */}
                <>
                    <p>Are you joining a household, or creating a new one?</p>
                    <button onClick={() => {
                        this.setState({
                            isJoin: true
                        })
                    }}>Join</button>
                    <button onClick={() => {
                        this.setState({
                            isJoin: false
                        })
                    }}>Create</button>
                </>

                {
                    this.state.isJoin
                        ?
                        <>
                            <p>Select the household you would like to join</p>
                            <select name='selectedHouseholdId' onChange={this.props.handleChange}>
                                {this.props.households.map(household => (
                                    <option key={household.id} value={household.id}>{household.name}</option>
                                ))}
                            </select>
                            <button onClick={() => {
                                console.log('user: ', this.props.currentUser)
                                console.log('selected hhid: ', this.props.selectedHouseholdId)
                                this.props.handleSubmit()
                            }}>Join!</button>
                        </>
                        :
                        <>
                            <p>Create a new household</p>
                        </>
                }



            </div>
        )
    }
}
