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
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                this.props.handleSubmit()
                            }}>
                                <select name='selectedHouseholdId' onChange={this.props.handleChange}>
                                    <option selected hidden>Choose a household</option>
                                    {this.props.households.map(household => (
                                        <option key={household.id} value={household.id}>{household.name}</option>
                                    ))}
                                </select>
                                <button>Join!</button>
                            </form>
                        </>
                        :
                        <>
                            <p >Create a new household</p>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                this.props.handleNewSubmit()
                            }}>
                                <p>Household Name</p>
                                <input name='householdData' type='text' value={this.props.householdData} onChange={this.props.handleChange} />
                                <button>Submit</button>
                            </form>
                        </>
                }



            </div>
        )
    }
}

