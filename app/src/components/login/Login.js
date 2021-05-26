import {React, useContext} from 'react';
import useFetchCall from '../utils/useFetchCall';
import useFetchData from '../utils/useFetchData';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import {SIGNIN_ENDPOINT, PUBKEY_ENDPOINT} from '../utils/Endpoints';
import './Login.css';


function Login({setToken}) {
    const request = null;
    const [signinData,,] = useFetchCall(SIGNIN_ENDPOINT,request);
    const [context, ] = useContext(LanguageContext);
    const [loading,electionRetrieved, pubKey] =  useFetchData(PUBKEY_ENDPOINT, false); 

    const handleClick = () => {
        setToken(signinData.Token);
        sessionStorage.setItem('id', signinData.UserID);
        return (<div>
            {loading? null 
                :(electionRetrieved? 
                    (<div>
                      {console.log(pubKey, " ", pubKey.length)}
                      {sessionStorage.setItem('pubKey', pubKey)}
                    </div>)
                    :null)}  
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