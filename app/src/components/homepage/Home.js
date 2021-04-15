import {React, useContext} from 'react';
import './Home.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useFetchData from '../useFetchData';



function Home(){
  const [context, ] = useContext(LanguageContext);
  const endpointLogin = '/dkg/pubkey';
  const endpointSignin = '/evoting/login';

  const {loading,electionRetrieved, electionData} =  useFetchData(endpointLogin, false); 

  function toHexString(byteArray) {
    return Array.from(byteArray, function(byte) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }
  const showKey = () => {
    console.log(electionData);


  }

  return(
    <div classeName='home'>
      <h1>{Translations[context].homeTitle}</h1>
      {loading? null 
                :(electionRetrieved? 
                    (<div>{showKey()}</div>)
                    :null)}
      
      <div className='home-txt'>{Translations[context].homeText}</div>
    </div>
  );
}

export default Home;