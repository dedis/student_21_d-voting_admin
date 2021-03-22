import React from 'react';

import '../App.css';
import ElectionForm from './ElectionForm.js'


function CreateElection() {
  return (
    <div className= 'create-election-wrapper'>
      
      <h4>Create a new election by filling out the information below</h4>
      
      <div className='election-form'>
      <ElectionForm />
      </div>


    </div>
  );
}

export default CreateElection;
