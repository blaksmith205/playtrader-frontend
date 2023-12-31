import React, { useState }from 'react';
import Login from './Login';
import Signup from './Signup';

const LoginSignup = ({showLogin, redirect}) => {
    const [login, setLogin] = useState(showLogin);

    return (
        <>
        { // Check if the login component should be shown
            (login)
            ? <Login redirect={redirect} signup={() => setLogin(false)}/>
            : <Signup redirect={redirect} />
        }
        </>
    )
}

export default LoginSignup;