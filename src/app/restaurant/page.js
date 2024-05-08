"use client"
import { useState } from 'react';
import RestaurantLogin from '../_components/RestaurantLogin'
import RestaurantSignup from '../_components/RestaurantSignup'
import RestaurantHeader from '../_components/RestaurantHeader';
import './style.css'
import RestaurantFooter from '../_components/Footer';
const Restaurant = () => {
    const [login, setLogin] = useState(true)
    return (
        <>
        <div className='container'>
            <RestaurantHeader/>
            <h1>Restaurant page</h1>
            {login ? <RestaurantLogin /> : <RestaurantSignup />}
            <button onClick={() => setLogin(!login)} className='button-link'>{!login ? "Already have an account?login" : "Dont have account Signup"}</button>
        </div>
        <RestaurantFooter/>
        </>
    )
}
export default Restaurant;