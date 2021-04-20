import {React, useContext} from 'react';
import useFetchData from '../useFetchData';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import './Login.css';

function Login({setToken}) {

    const endpointSignin = '/evoting/login';
    const [,, signinData] =  useFetchData(endpointSignin, true);
    const [context, ] = useContext(LanguageContext);

    const handleClick = () => {
        setToken(signinData.Token);
        sessionStorage.setItem('id', signinData.UserID);
        console.log("jel");
    }
    return (
        <div className='login-wrapper'>
            <div className='login-txt'>{Translations[context].loginText}</div>
            <button className='login-btn' onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;