
import {React,useContext} from 'react';

import './About.css';
import {Translations} from './language/Translations';
import {LanguageContext} from './language/LanguageContext';


function About() {
 const [context, setContext] = useContext(LanguageContext)
  
  return(
    <div className='about-container'>
      <div className='about-text'>
        {Translations[context].about}
      </div> 
    </div>
    );


  }
 
export default About;
