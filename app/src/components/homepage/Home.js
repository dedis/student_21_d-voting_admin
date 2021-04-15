import {React, useContext} from 'react';
import './Home.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useFetchData from '../useFetchData';



function Home(){
  const [context, ] = useContext(LanguageContext);
  const endpoint = '/evoting/login';

  const {loading,electionRetrieved, electionData} =  useFetchData(endpoint); 

  return(
    <div classeName='home'>
      <h1>{Translations[context].homeTitle}</h1>
      {loading? null: console.log(electionData)}
      
      <div className='home-txt'>{Translations[context].homeText}</div>
    </div>
  );
}

export default Home;