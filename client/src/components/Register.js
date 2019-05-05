import React from 'react';

// This component handles our register form
const Register = (props) => {

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <hr />
            <form onSubmit={props.handleRegister} >
                <p>Name:</p>
                <input name="name" type="text" value={props.formData.name} onChange={props.handleChange} />
                <p>Password:</p>
                <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />

                <p>Household</p>
                <select name='household_id' value={props.formData.household_id} onChange={props.handleChange}>
                    {props.allHouseholds.map(household => (
                        <option key={household.id} value={household.id}>{household.name}</option>
                    ))}
                </select>
                <p>Or Create New Household</p>
                {/* <input name="household_id" type="text" value={props.formData.household_id} onChange={props.handleChange} /> */}
                <hr />
                <button>Register</button>
            </form>
        </div>
    );
}

export default Register;
