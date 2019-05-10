import React from 'react'
import '../stylesheets/LandingPage.css'
// import shopping from '../images/shoppingPNG.png'
import cart from '../images/4659.jpg'



const LandingPage = (props) => {
    return (
        <div className='full-landing-page'>
            {/* <div className='landing-image'>
                <img src={cart} />
            </div> */}
            <div className='landing-page'>
                <h1>Welcome to ReCollect</h1>
                <h3>Never run out of household essentials again</h3>
                <button>Enter</button>
            </div>
        </div>
    )
}

export default LandingPage

