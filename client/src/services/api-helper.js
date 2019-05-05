const url = 'http://localhost:3000'

// login user
export const loginUser = (loginData) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify(loginData),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${url}/auth/login`, opts)
        .then(resp => resp.json())
}

//register user

export const registerUser = (registerData) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ user: registerData }),
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return fetch(`${baseUrl}/users/`, opts)
        .then(resp => resp.json())
}


// create household
// update household
// destroy household


//create item
//update item
//destroy item
//read all items


//create category
//real all categories?

//

