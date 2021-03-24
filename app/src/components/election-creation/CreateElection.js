import React from 'react';

import './CreateElection.css';
import ElectionForm from './ElectionForm.js'
import UploadFile from './UploadFile';


function CreateElection() {
  return (
    <div className= 'create-election-wrapper'>     
      <h4>Create a new election by filling out the information below or by uploading a json file</h4>
      
      <div className='election-form'>
        <ElectionForm />        
        <UploadFile />
      </div>
    </div>
  );
}

export default CreateElection;
