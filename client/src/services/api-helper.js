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

    console.log(opts)

    return fetch(`${url}/users/`, opts)
        .then(resp => {
            console.log(opts.headers)
            resp.json()
        })
}


// create household
export const createHousehold = (data) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ household: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${baseUrl}/households`, opts)
        .then(resp => resp.json())
}


// update household
export const updateHousehold = (data) => {
    const opts = {
        method: 'PUT',
        body: JSON.stringify({ household: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${baseUrl}/households/${id}`, opts)
        .then(resp => resp.json())
}

// destroy household
export const destroyHousehold = (id) => {
    const opts = {
        method: 'DELETE'
    }
    return fetch(`${baseUrl}/households/${id}`, opts)
}








//create item
//update item
//destroy item
//read all items


//create category
//real all categories?

//

