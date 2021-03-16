import React from 'react';

import '../App.css';
import ElectionForm from './ElectionForm.js'


function CreateElection() {
  return (
    <div>
      
      <h3>Create a new election by filling out the information below</h3>
      
      <div className='election-form'>
      <ElectionForm />
      </div>


    </div>
  );
}

export default CreateElection;
