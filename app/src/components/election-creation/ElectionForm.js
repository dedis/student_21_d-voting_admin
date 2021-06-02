
import {React, useState, useContext, useEffect} from 'react';
import './ElectionForm.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import {CREATE_ENDPOINT} from '../utils/Endpoints';
import usePostCall from '../utils/usePostCall';


function ElectionForm({setShowModal, setTextModal}){
    const [context, ] = useContext(LanguageContext);
    const [electionName, setElectionName] = useState('');
    const [newCandidate, setNewCandidate] = useState('');
    const [candidates, setCandidates] = useState([]);
    const[errors, setErrors] = useState({});
    const [postError, setPostError] = useState(null);
    const {postData} = usePostCall(setPostError);
    const[isSubmitting, setIsSubmitting] = useState(false);


    useEffect(()=>{
        if(postError ===null){
            setTextModal(Translations[context].electionSuccess);
        } else {
            if(postError.includes('ECONNREFUSED')){
                setTextModal(Translations[context].errorServerDown);
            } else {
                setTextModal(Translations[context].electionFail);}      
        }    
    }, [isSubmitting])

  /*transform string of type "1,4,5" to an array of number [1,4,5] */
    //TODO: throw error if problem
  function unpack(str) {
        var bytes = [];
        var b  =str.split(",");
        
        for(var i = 0; i < b.length; i++) {
            var char = parseInt(b[i]);
            bytes.push(char);
        }
        return bytes;
    }

    const sendFormData = async() => {
        //create the JSON object
        const election = {};
        election['Title']=electionName;
        election['AdminId'] = sessionStorage.getItem('id');
        election['Candidates'] = candidates;
        election['Token'] = sessionStorage.getItem('token');
        election['PublicKey'] = unpack(sessionStorage.getItem('pubKey'));

        let postRequest = {
            method: 'POST',
            body: JSON.stringify(election)
        }
        setPostError(null);
        postData(CREATE_ENDPOINT, postRequest, setIsSubmitting);
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
               await sendFormData();
                setShowModal(prev => !prev);
                setElectionName('');
                setNewCandidate('');
                setCandidates([]);
                setPostError(null);
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
    
    const isCandidateUnique = (cand) => {
        return !candidates.some(item => cand ===item);
    }

    const handleAdd = e => {
        e.preventDefault()
        let errors = {};
        if (newCandidate.length === 0){
            errors['empty'] = 'There is nothing to add.';
            setErrors(errors);
            return;
        }

        if(!isCandidateUnique(newCandidate)){
            errors['unique'] = 'This candidate has already been added.'
            setErrors(errors);
            return;
        }

        setNewCandidate('');
        setErrors({'newCandidate': ''})
        setCandidates(candidates.concat(newCandidate));     
    }

    const handleDelete = cand => {
        const choices = candidates.filter(candi => candi !== cand);
        setCandidates(choices);
    }

    const handleKeyPress = (e) => {
            if(e.key === "Enter"){
                e.preventDefault();
                handleAdd(e);
            }  
    }

    const handleKeyPressTitle = (e) =>{
        if(e.key === 'Enter'){
            e.preventDefault()
        }    
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
                        onKeyPress = {handleKeyPressTitle}  
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
                        onKeyPress={handleKeyPress}
                        //onKeyDown = {handleKeyDown}
                        onSubmit = {handleAdd}  
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
                    {candidates.map((cand,i) => (
                        <div key={i}>
                        <li >
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
