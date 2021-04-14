import {React,useContext, useState} from 'react';

import './CreateElection.css';
import ElectionForm from './ElectionForm.js'
import UploadFile from './UploadFile';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import Modal from '../modal/Modal';


function CreateElection() {
  const [context, setContext] = useContext(LanguageContext);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className= 'create-election-wrapper'>
      <Modal showModal={showModal} setShowModal={setShowModal} textModal = {Translations[context].electionSuccess} buttonLeft = {null} buttonRight={Translations[context].close} />     
      <h4>{Translations[context].create}</h4>
      
      <div className='election-form'>
        <ElectionForm setShowModal={setShowModal} />     
        <UploadFile setShowModal={setShowModal}/>
      </div>
    </div>
  );
}

export default CreateElection;
