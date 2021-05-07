import {React, useContext} from 'react';
import useFetchData from '../utils/useFetchData';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import './Login.css';

//TODO: this component will be later on replaced by the authentication of react-router library
function Login({setToken}) {
    const endpointSignin = '/evoting/login';
    const [,, signinData] =  useFetchData(endpointSignin, true);
    const [context, ] = useContext(LanguageContext);

    const handleClick = () => {
        setToken(signinData.Token);
        sessionStorage.setItem('id', signinData.UserID);
    }
    return (
        <div className='login-wrapper'>
            <div className='login-txt'>{Translations[context].loginText}</div>
            <button className='login-btn' onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;