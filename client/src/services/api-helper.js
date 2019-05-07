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

export const updateUser = (id, userData) => {
    const opts = {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }

    return fetch(`${url}/users/${id}`, opts)
        .then(response => response.json())
        .catch(e => e.message)
}


// create household
export const createHousehold = (data) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ household: data }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }
    return fetch(`${url}/households`, opts)
        .then(resp => resp.json())
}

// get all households
export const getHouseholds = () => {
    return fetch(`${url}/households`)
        .then(response => response.json())
        .catch(e => e.message)
}

//get Household
export const getHousehold = (id) => {
    const opts = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
    }
    console.log('opts: ', opts)
    return fetch(`${url}/households/${id}`, opts)
        .then(resp => resp.json())
        .catch(e => e.message)
}

// update household
export const updateHousehold = (id, data) => {
    const opts = {
        method: 'PUT',
        body: JSON.stringify({ household: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${url}/households/${id}`, opts)
        .then(resp => resp.json())
        .catch(e => e.message)
}

// destroy household
export const destroyHousehold = (id) => {
    const opts = {
        method: 'DELETE'
    }
    return fetch(`${url}/households/${id}`, opts)
}


//create item
export const createItem = (data) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ Item: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${url}/items`, opts)
        .then(resp => resp.json())
}



//update item
export const updateItem = (id, data) => {
    const opts = {
        method: 'PUT',
        body: JSON.stringify({ Item: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${url}/items/${id}`, opts)
        .then(resp => resp.json())
}


//destroy item
export const destroyItem = (id) => {
    const opts = {
        method: 'DELETE'
    }
    return fetch(`${url}/items/${id}`, opts)
}

//read all items
export const showHouseholdItems = (household_id) => {
    return fetch(`${url}/${household_id}/items`)
        .then(response => response.json())
        .catch(e => e.message)
}


//create category
export const createCategory = (data) => {
    const opts = {
        method: 'POST',
        body: JSON.stringify({ Category: data }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${url}/categories`, opts)
        .then(resp => resp.json())
}
//read category items
export const showCategoryItems = (category_id) => {
    return fetch(`${url}/${category_id}/items`)
        .then(response => response.json())
        .catch(e => e.message)
}

//

