import React from 'react'
import '../stylesheets/NewHousehold.css'


export default class NewHousehold extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isJoin: null,
            displayOptions: false
        }
    }
    render() {
        return (
            <div className='new-household-card'>

                <>
                    <p>Are you joining a household, or creating a new one?</p>
                    <div className='choose-household-buttons'>
                        <button className='join-button' onClick={() => {
                            this.setState({
                                displayOptions: true,
                                isJoin: true
                            })
                        }}>Join</button>
                        <button className='create-household-button' onClick={() => {
                            this.setState({
                                displayOptions: true,
                                isJoin: false
                            })
                        }}>Create</button>
                    </div>
                </>


                {
                    this.state.isJoin || this.state.displayOptions
                        ?
                        <>
                            {this.state.isJoin ?
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
                                        <h4 className='household-choice-name'>Household Name</h4>
                                        <input name='householdData' type='text' value={this.props.householdData} onChange={this.props.handleChange} />
                                        <button className='household-submit-button'>Submit</button>
                                    </form>
                                </>
                            }
                        </>
                        :
                        <>
                            <div></div>
                        </>
                }




            </div>
        )
    }
}

