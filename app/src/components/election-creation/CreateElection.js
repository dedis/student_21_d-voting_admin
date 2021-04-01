import {React,useContext} from 'react';

import './CreateElection.css';
import ElectionForm from './ElectionForm.js'
import UploadFile from './UploadFile';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


function CreateElection() {
  const [context, setContext] = useContext(LanguageContext);

  return (
    <div className= 'create-election-wrapper'>     
      <h4>{Translations[context].create}</h4>
      
      <div className='election-form'>
        <ElectionForm />        
        <UploadFile />
      </div>
    </div>
  );
}

export default CreateElection;
