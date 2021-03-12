import React from 'react';

import '../App.css';
import ElectionForm from './ElectionForm.js'


function CreateElection() {
  return (
    <div>
      
      <h1>Create Election</h1>
      <div className='election-form'>
      <ElectionForm />
      </div>


    </div>
  );
}

export default CreateElection;
