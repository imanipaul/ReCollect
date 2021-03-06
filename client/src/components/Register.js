import React from 'react';
import { withRouter } from 'react-router'
import '../stylesheets/Register.css'



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
                <form onSubmit={(e) => {
                    e.preventDefault()
                    this.props.handleRegister()
                    this.props.history.push('/add-household')
                }} className='register-form'>
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
