
import {React, useState, useContext} from 'react';
import './ElectionForm.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


function ElectionForm({setShowModal, setTextModal}){
    const [context, ] = useContext(LanguageContext);
    const [electionName, setElectionName] = useState('');

    const [newCandidate, setNewCandidate] = useState('');

    const [candidates, setCandidates] = useState([]);

    const[errors, setErrors] = useState({});

    const[isSubmitting, setIsSubmitting] = useState(false);

    const createEndPoint = '/evoting/create';
    
   
    const toHexString = (byteArray) =>{
        return Array.from(byteArray, function(byte) {
          return ('0'+(byte).toString(16)).slice(-2);
        }).join('')
    }
  /*transform string of type "1,4,5" to an array of number [1,4,5] */
    function unpack(str) {
        var bytes = [];
        var b  =str.split(",");
        
        for(var i = 0; i < b.length; i++) {
            var char = parseInt(b[i]);
            bytes.push(char);
        }

        return bytes;
    }

    /* Append the id of a created election to others in the localStorage */
    const storeIdNewElection = (id) => {
        var idsStored = localStorage.getItem('electionIDs');
        if(!idsStored){
            localStorage.setItem('electionIDs', id);
        } else {
            if(Array.isArray(idsStored)){
                localStorage.setItem('electionIDs', idsStored.concat(id));
            } else {
                idsStored = [idsStored];
                localStorage.setItem('electionIDs',idsStored.concat(id));
            }
        }
    }

    const sendFormData = async() => {
        //create the JSON object
        const election = {};
        election['Title']=electionName;
        election['AdminId'] = sessionStorage.getItem('id');
        election['Candidates'] = candidates;
        election['Token'] = sessionStorage.getItem('token');
        election['PublicKey'] = unpack(sessionStorage.getItem('pubKey'));
        console.log(JSON.stringify(election));
        console.log(typeof JSON.stringify(election));


        try{
            const response = await fetch(createEndPoint, {
                method: 'POST',
                body: JSON.stringify(election)
            });
        /* Need to deal with the response : saving id, key,...!!!!!!!*/
            if(response.ok){
            const data = await response.json();
            console.log(data);
            return data.ElectionID;
            } else{
                return (-1);
            }

 
        } catch(e) {
            
            return e;
        }
   
    }

    const validate = () => {
        let errors = {};
        let isValid = true;

        if(candidates.length === 0){
            errors['candidates'] = Translations[context].errorCandidates;
            isValid = false;
        }
        if(newCandidate.length !== 0){
           errors['newCandidate'] = Translations[context].errorNewCandidate;
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
               const response =  await sendFormData();
               if(response === -1){
                    setTextModal(Translations[context].electionFail);
               } else{
                    setTextModal(Translations[context].electionSuccess);
                    storeIdNewElection(response);
               }
                setShowModal(prev => !prev);
                setElectionName('');
                setNewCandidate('');
                setCandidates([]);
            } catch (e){
                alert(Translations[context].electionFail);
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
        return candidates.some(item => cand ===item.text);
    }

    const handleAdd = e => {
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
        setErrors({'newCandidate': ''})
        setCandidates(candidates.concat(newCandidate));     
    }

    const handleDelete = choiceId => {
        const choices = candidates.filter(candi => candi !== choiceId);
        setCandidates(choices);
    }

    return(
    <div className='form-wrapper'>
        <div className="form-content-left">
        <div className='option'>Option 1</div>
            <form className = 'form-choices' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="new-name"
                    className='form-label'>
                        {Translations[context].elecName}*: 
                    </label>
                    <input
                        id='new-name'
                        type='text' required
                        value={electionName}  
                        onChange={handleChangeName}    
                        className = 'form-name'  
                        placeholder = {Translations[context].namePlaceHolder}          
                    />
                </div>

                <div>
                    
                    <label htmlFor="new-choice"
                    className='form-label'>
                        {Translations[context].addCandidate} *:
                    </label>
                    
                    <input
                        id='new-choice'
                        type = 'text'
                        name = 'newCandidate'
                        value={newCandidate} 
                        onChange={handleChangeCandidate}    
                        onSubmit = {onSubmitPreventDefault}  
                        className = 'form-choice'  
                        placeholder = {Translations[context].addCandPlaceHolder}  
                        />               
                    <button type='button' className='submit-choice-btn' onClick={handleAdd} onSubmit={onSubmitPreventDefault} >
                    {Translations[context].add}
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
                                {cand}
                                <button type='button' className='delete-btn' onClick={() => handleDelete(cand)} onSubmit={onSubmitPreventDefault}>
                                {Translations[context].delete} 
                            </button>
                        </li>
                        </div>
                    ))}
                    </ul>
                </div>


                <div>
                    <button type='submit' className='submit-form-btn' onSubmit={handleSubmit}>
                    {Translations[context].createElec} 
                    </button>
                </div>
            </form>
        </div>


</div>
    );
}


export default ElectionForm;
