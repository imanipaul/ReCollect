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

                    <hr />
                    <button>Register</button>
                </form>
            </div>
        );
    }
}

export default withRouter(Register);
