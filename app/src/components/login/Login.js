import {React, useContext} from 'react';
import useFetchCall from '../utils/useFetchCall';
import useFetchKey from '../utils/useFetchKey';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import {SIGNIN_ENDPOINT, PUBKEY_ENDPOINT} from '../utils/Endpoints';
import './Login.css';


function Login({setToken}) {
    const request = null;
    const [signinData,,] = useFetchCall(SIGNIN_ENDPOINT,request);
    const [context, ] = useContext(LanguageContext);
    //const [loading,electionRetrieved, pubKey] =  useFetchData(PUBKEY_ENDPOINT, false); 
    const [pubKey, loading, error] = useFetchKey(PUBKEY_ENDPOINT);

    const handleClick = () => {
        setToken(signinData.Token);
        sessionStorage.setItem('id', signinData.UserID);
        return (<div>
            {loading? null 
                :(error === null? 
                    (<div>
                      {console.log(pubKey, " ", pubKey.length)}
                      {sessionStorage.setItem('pubKey', pubKey)}
                    </div>)
                    :<div>{Translations[context].errorRetrievingKey}</div>)}  
        </div>)
    }

    return (
        <div className='login-wrapper'>
            <div className='login-txt'>{Translations[context].loginText}</div>
            <button id='login-button' className='login-btn' onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;