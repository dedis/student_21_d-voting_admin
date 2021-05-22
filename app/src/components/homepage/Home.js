import {React, useContext} from 'react';
import './Home.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useFetchData from '../utils/useFetchData';



function Home(){
  const [context, ] = useContext(LanguageContext);
  const endpointPubKey = '/dkg/pubkey';
  const [loading,electionRetrieved, pubKey] =  useFetchData(endpointPubKey, false); 

  return(
    <div className='home'>
      <h1>{Translations[context].homeTitle}</h1>
      {loading? null 
                :(electionRetrieved? 
                    (<div>
                      {console.log(pubKey, " ", pubKey.length)}
                      {sessionStorage.setItem('pubKey', pubKey)}
                    </div>)
                    :null)}   
      <div className='home-txt'>{Translations[context].homeText}</div>
    </div>
  );
}

export default Home;