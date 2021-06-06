import {React, useContext, useState} from 'react';
import useFetchKey from '../utils/useFetchKey';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import {SIGNIN_ENDPOINT, PUBKEY_ENDPOINT} from '../utils/Endpoints';
import './Login.css';
import PropTypes from 'prop-types';


const Login = ({setToken}) => {
    const request = null;
    //const [signinData,signinLoading,signinError] = useFetchCall(SIGNIN_ENDPOINT,request);
    const [loginError, setLoginError] = useState();
    const [context, ] = useContext(LanguageContext);
    const [pubKey, loading, error] = useFetchKey(PUBKEY_ENDPOINT);

    const handleClick = async() => {
        try{
            const response = await fetch(SIGNIN_ENDPOINT,request);        
            if(!response.ok){
                throw Error(response.statusText);
            } else {
                let loginData = await response.json();
                setToken(loginData.Token);
                sessionStorage.setItem('id', loginData.UserID);
                setLoginError();
            }
        } catch(error){
            setLoginError(error);
            console.log(error);
        }

        return (<div>
            {loading? null 
                :(error === null? 
                    (<div>
                      {console.log(pubKey, " ", pubKey.length)}
                      {sessionStorage.setItem('pubKey', pubKey)}
                    </div>)
                    :<div>{Translations[context].errorRetrievingKey}</div>)}  
            {loginError === null? <div></div>: Translations[context].errorServerDown}
        </div>)
    }

    return (
        <div className='login-wrapper'>
            <div className='login-txt'>{Translations[context].loginText}</div>
            <button id='login-button' className='login-btn' onClick={handleClick}>{Translations[context].login}</button>
        </div>
    )
}

Login.propTypes = {
    setToken : PropTypes.func,
}

export default Login;