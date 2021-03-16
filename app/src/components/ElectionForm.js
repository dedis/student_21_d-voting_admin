
import {React, useState} from 'react';
import '../App.css';

function ElectionForm() {
    const [electionName, setElectionName] = useState('');

    const [newCandidate, setNewCandidate] = useState('');

    const [candidates, setCandidates] = useState({
    candidates: []
    });

    const handleSubmit = e =>{
    e.preventDefault();
    };

    const handleChangeName = e => {
    setElectionName(e.target.value);
    }

    const handleChangeCandidate = e => {
    setNewCandidate(e.target.value);
    }

    const handleAdd = () => {
    if (newCandidate.length === 0){
        /* add message to user!!!!!! */
        return;
    };
    
    const newItem = {
        id: Date.now(),
        text: newCandidate
   
    };

    setNewCandidate('');
    setCandidates({
        candidates: candidates.candidates.concat(newItem)
    });     
    };

    const handleDelete = choiceId => {
    const choices = candidates.candidates.filter(candi => candi.id !== choiceId);
    setCandidates({candidates: choices});
    }

    return(
    <div className="form-content-left">

        <form className = 'form-choices' onSubmit={handleSubmit}>
            <div>
                <label htmlFor="new-name"
                className='form-label'>
                    Enter the name of the election: 
                </label>
                <input
                    id='new-name'
                    type='text'
                    value={electionName}  
                    onChange={handleChangeName}    
                    className = 'form-name'  
                    placeholder = 'enter the name'           
                />
            </div>

            <div>
                
                <label htmlFor="new-choice"
                className='form-label'>
                    Enter a possible choice:
                </label>
                <input
                    id='new-choice'
                    type = 'text'
                    value={newCandidate} 
                    onChange={handleChangeCandidate}      
                    className = 'form-choice'  
                    placeholder = 'add a candidate'           
                />
                <button className='submit-choice' onClick={handleAdd} >
                    Add
                </button>
            </div>
            <div className='form-candidates'>
                <ul className='choices-saved'>
                {candidates.candidates.map(cand => (
                    <div className='ch'>
                    <li>
                            {cand.text}
                            <button className='delete-btn' onClick={() => handleDelete(cand.id)}>
                            Delete
                        </button>
                    </li>
                    </div>
                ))}
                </ul>
            </div>


            <div>
                <button type='submit' className='submit-form'>
                    Create election
                </button>
            </div>
        </form>
    </div>
    );
}

export default ElectionForm;
