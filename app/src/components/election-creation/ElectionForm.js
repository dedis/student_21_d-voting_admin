
import {React, useState} from 'react';
import './ElectionForm.css';
import UploadFile from './UploadFile';

function ElectionForm() {
    const [electionName, setElectionName] = useState('');

    const [newCandidate, setNewCandidate] = useState('');

    const [candidates, setCandidates] = useState([]);

    const[errors, setErrors] = useState({});

    const[isSubmitting, setIsSubmitting] = useState(false);

    const saveFormData = async() => {
        const election = {};
        election['electionName']=electionName;
        election['candidates'] = candidates;
        try{
            const response = await fetch('https://60475e95b801a40017ccbff6.mockapi.io/api/election', {
                method: 'POST',
                body: JSON.stringify(election)
            });
        /* Need to deal with the response : saving id, key,...!!!!!!!*/
            const data = await response.json();
            return;
        } catch(e) {
            return e;
        }
   
    }

    const validate = () => {
        let errors = {};
        let isValid = true;

        if(candidates.length === 0){
            errors['candidates'] = 'You must add at least one candidate!';
            isValid = false;
        }
        if(newCandidate.length !== 0){
           errors['newCandidate'] = 'Are you sure you dont want to add the candidate?';
            isValid = false;
        }
        setErrors(errors);
        return isValid;
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        if(validate()){
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
        }
    };

    const onSubmitPreventDefault = e =>{
        e.preventDefault();
    }

    const handleChangeName = e => {
        setElectionName(e.target.value);
    }

    const handleChangeCandidate = e => {
        e.preventDefault();
        setNewCandidate(e.target.value);
    }

    const checkUniqueCandidate = (cand) => {
        console.log(cand);
        console.log(candidates);
        return candidates.some(item => cand ===item.text);
    }

    const handleAdd = e => {
        console.log("hello");
        e.preventDefault()
        let errors = {};
        if (newCandidate.length === 0){
            errors['empty'] = 'There is nothing to add.';
            setErrors(errors);
            return;
        };

        if(checkUniqueCandidate(newCandidate)){
            errors['unique'] = 'This candidate has already been added.'
            setErrors(errors);
            return;
        }
        
        const newItem = {
            id: Date.now(),
            text: newCandidate
    
        };

        setNewCandidate('');
        console.log("hello");
        setCandidates(candidates.concat(newItem));     
    }

    const handleDelete = choiceId => {
        const choices = candidates.filter(candi => candi.id !== choiceId);
        setCandidates(choices);
    }

    return(
    <div className='form-wrapper'>
        <div className="form-content-left">

            <form className = 'form-choices' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new-name"
                    className='form-label'>
                        Election name*: 
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
                        Add a candidate*:
                    </label>
                    
                    <input
                        id='new-choice'
                        type = 'text'
                        name = 'newCandidate'
                        value={newCandidate} 
                        onChange={handleChangeCandidate}    
                        onSubmit = {onSubmitPreventDefault}  
                        className = 'form-choice'  
                        placeholder = 'add a candidate'   
                        />               
                    <button type='button' className='submit-choice-btn' onClick={handleAdd} onSubmit={onSubmitPreventDefault} >
                        Add
                    </button>
                    <span className='form-error'>{errors.unique}</span>
                    <span className='form-error'>{errors.empty}</span>
                    <span className='form-error'>{errors.newCandidate}</span>
                    <span className='form-error'>{errors.candidates}</span>
                    
                </div>
                <div className='form-candidates'>
                    <ul className='choices-saved'>
                    {candidates.map(cand => (
                        <div className='ch'>
                        <li key={cand}>
                                {cand.text}
                                <button type='button' className='delete-btn' onClick={() => handleDelete(cand.id)} onSubmit={onSubmitPreventDefault}>
                                Delete
                            </button>
                        </li>
                        </div>
                    ))}
                    </ul>
                </div>


                <div>
                    <button type='submit' className='submit-form-btn' onSubmit={handleSubmit}>
                        Create election
                    </button>
                </div>
            </form>
        </div>


</div>
    );
}


export default ElectionForm;
