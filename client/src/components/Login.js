import React from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import '../stylesheets/Login.css'


const Login = (props) => {

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                props.handleLogin();

            }} className='login'>
                <p>Name:</p>
                <input name="name" type="text" value={props.formData.name} onChange={props.handleChange} />
                <p>Password  :</p>
                <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
                <button>Login</button>
                <div className='register'>
                    <p>New User? </p>
                    <Link to="/register">Register Here</Link>
                </div>
            </form>
        </div>
    );
}

export default withRouter(Login);
