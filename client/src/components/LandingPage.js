import React from 'react'
import '../stylesheets/LandingPage.css'
import cart from '../images/4659.jpg'
import { withRouter } from 'react-router'



const LandingPage = (props) => {
    return (
        <div className='full-landing-page'>
            <div className='landing-image'>
                <img src={cart} alt='cart' />
            </div>
            <div className='landing-page'>
                <h1>Welcome to ReCollect</h1>
                <h3>Never run out of household essentials again</h3>
                <button className='enter-button' onClick={() => (props.history.push("/login"))}>Enter</button>
            </div>
        </div>
    )
}

export default withRouter(LandingPage)

