
import {React, useState} from 'react';
import '../App.css';

function ElectionForm() {
    const [electionName, setElectionName] = useState('');

    const [newCandidate, setNewCandidate] = useState('');

    const [candidates, setCandidates] = useState([]);

    const[isSubmitting, setIsSubmitting] = useState(false);

    const saveFormData = async() => {
        const election = [electionName, candidates];
        try{
            const response = await fetch('https://60475e95b801a40017ccbff6.mockapi.io/api/election', {
                method: 'POST',
                body: JSON.stringify(election)
            });
        /* Need to deal with the response : saving id, key,...!!!!!!!*/
            const data = await response.json();
            console.log(data);
            return;
        } catch(e) {
            return e;
        }
   
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(candidates.length === 0){
            alert('You must add at least one candidate!');
            return;
        }
        if(newCandidate.length !== 0){
            alert('Are you sure you dont want to add the candidate?');
        }
        setIsSubmitting(true);
        try{
            await saveFormData();
            alert('Your election was successfully submitted!')
            setElectionName('');
            setNewCandidate('');
            setCandidates([]);
        } catch (e){
            alert('Election creation failed! ${e.message}');
        }
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
    setCandidates(candidates.concat(newItem));     
    };

    const handleDelete = choiceId => {
    const choices = candidates.filter(candi => candi.id !== choiceId);
    setCandidates(choices);
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
                    type='text' required
                    value={electionName}  
                    onChange={handleChangeName}    
                    className = 'form-name'  
                    placeholder = 'enter the name'           
                />
            </div>

            <div>
                
                <label htmlFor="new-choice"
                className='form-label'>
                    Add a candidate:
                </label>
                <input
                    id='new-choice'
                    type = 'text'
                    value={newCandidate} 
                    onChange={handleChangeCandidate}      
                    className = 'form-choice'  
                    placeholder = 'add a candidate'           
                />
                <button type='button' className='submit-choice' onClick={handleAdd} >
                    Add
                </button>
            </div>
            <div className='form-candidates'>
                <ul className='choices-saved'>
                {candidates.map(cand => (
                    <div className='ch'>
                    <li key={cand.id}>
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
                <button type='submit' className='submit-form' onSubmit={handleSubmit}>
                    Create election
                </button>
            </div>
        </form>
    </div>
    );
}


function validateForm(){

}

export default ElectionForm;
