import React from 'react';
import { Route, Link } from 'react-router-dom'
import { withRouter } from 'react-router'


// This component handles our register form
class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasHousehold: false
        }
    }

    render() {

        return (
            <div className="auth-container">
                <h2>Register</h2>
                <hr />
                <form onSubmit={this.props.handleRegister} >
                    <p>Name:</p>
                    <input name="name" type="text" value={this.props.formData.name} onChange={this.props.handleChange} />
                    <p>Password:</p>
                    <input name="password" type="password" value={this.props.formData.password} onChange={this.props.handleChange} />


                    {/* {
                        this.state.hasHousehold
                            ?
                            <>

                                <button onClick={() => {
                                    this.setState({
                                        hasHousehold: false
                                    })
                                }}>Existing Household</button>
                            </>

                            :
                            <>
                                <p>Household</p>
                                <select name='household_id' value={this.props.formData.household_id} onChange={this.props.handleChange}>
                                    {this.props.allHouseholds.map(household => (
                                        <option key={household.id} value={household.id}>{household.name}</option>
                                    ))}
                                </select>
                                <p>Or click here to Create a new household:</p>
                                <button onClick={() => {
                                    this.setState({
                                        hasHousehold: true
                                    })
                                    this.props.history.push(`/new-household`)
                                }}>New Household</button>
                            </>
                    } */}

                    <hr />
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);
