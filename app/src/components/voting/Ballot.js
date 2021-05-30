import {React,useContext, useState, useEffect} from 'react';
import './Ballot.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useElection from '../utils/useElection';
import usePostCall from '../utils/usePostCall';
import {CAST_BALLOT_ENDPOINT} from '../utils/Endpoints';
import {encryptVote} from './VoteEncrypt';
import Modal from '../modal/Modal';
import {Link} from 'react-router-dom';
import kyber from "@dedis/kyber";


const Ballot = (props) => {//props.location.data = id of the election
    
    const [context,] = useContext(LanguageContext);
    const token = sessionStorage.getItem('token');
    const {loading, title,candidates,electionID,status,pubKey,result, setResult, setStatus} = useElection(props.location.data, token)
    const [choice, setChoice] = useState('');
    const [userErrors, setUserErrors] = useState({});
    const edCurve = kyber.curve.newCurve("edwards25519");
    const [postRequest, setPostRequest] = useState(null);
    const [postError, setPostError] = useState(null);
    const {postData} = usePostCall(setPostError);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState(Translations[context].voteSuccess);

    useEffect(()=>{
        if(postRequest !== null){
            setPostError(null);
            postData(CAST_BALLOT_ENDPOINT, postRequest, setShowModal);
        }
    }, [postRequest])

    useEffect(()=> {
        if(postError !== null){
            setModalText(Translations[context].voteFailure);
        } else {
            setModalText(Translations[context].voteSuccess);
        }
    }, [postError])


    /*Transform a string of type "1,2,3" to an array [1,2,3]*/ 
    function unpack(str) {
        var bytes = [];
        var b  =str.split(",");

        
        
        for(var i = 0; i < b.length; i++) {
            var char = parseInt(b[i]);
            bytes.push(char);
        }
        

        return new Uint8Array(bytes);
    }

    const handleCheck = e =>{
        console.log(e.target.value);
        setChoice(e.target.value);
}


    const createBallot = (K,C)=>{
        let ballot = {};
        let vote = JSON.stringify({'K': Array.from(K), 'C':Array.from(C)});

        ballot['ElectionID'] = electionID; 
        ballot['UserId'] = sessionStorage.getItem('id');       
        ballot['Ballot'] = [...Buffer.from(vote)];
        ballot['Token'] = token;
        return ballot;
    }

    const sendBallot = async() =>{
        sessionStorage.setItem(electionID, choice);
        console.log(choice);
        const [K,C] = encryptVote(choice,Buffer.from(unpack(sessionStorage.getItem('pubKey')).buffer), edCurve);

        //sending the ballot to evoting server
        let ballot = createBallot(K,C);
        let newRequest = {
            method: 'POST',
            body: JSON.stringify(ballot)
        }
        setPostRequest(newRequest);

    }

    const handleClick = () => {
        let errors = {};
        if(choice === ''){
            errors['noCandidate'] = Translations[context].noCandidate
            setUserErrors(errors);
            return;
        }
        sendBallot();
        setUserErrors({});
    }

    const electionClosedDisplay = () =>{
        return <div> {Translations[context].voteImpossible}</div>
    }

    const possibleChoice = (candidate) => {
        return (
                <div className='checkbox-full'>
                    <input 
                    type='checkbox'
                    key={candidate}
                    className = 'checkbox-candidate'
                    value = {candidate}
                    checked = {(choice === candidate)} //only one checkbox can be selected
                    onChange = {handleCheck}
                    />
                    <label className='checkbox-label'>
                        {candidate}
                    </label>
                </div>
        )}

    const ballotDisplay = () => {
        return (
            <div><h3 className = 'ballot-title'>{title}</h3>
            {console.log(props)}
            <div className='checkbox-text'>{Translations[context].pickCandidate}</div>
            {candidates !== null && candidates.length !== 0 ?
            candidates.map(candidate => (possibleChoice(candidate))) : <p>Default</p>}
            {candidates !== null? <div><div className='cast-ballot-error'>{userErrors.noCandidate}</div>
                <button className='cast-ballot-btn' onClick={handleClick}>{Translations[context].castVote}</button></div> : null}</div>
        )
    }

    return (
        
        
        <div className = 'ballot-wrapper'>

            {/*lastVote !== null ?
                (
                <div className='past-vote'>{Translations[context].alreadyVoted} <b>{lastVote}</b> {Translations[context].alreadyVoted2}
                <br />
                {Translations[context].changeVote}</div>): (<span></span>)
                */}
            <Modal showModal={showModal} setShowModal={setShowModal} textModal = {modalText} buttonRight={Translations[context].close} />
            {console.log(candidates)}
            {loading? (<p className='loading'>{Translations[context].loading}</p>)
                :(<div> {status === 1? ballotDisplay():electionClosedDisplay()}
                    <Link to='/vote'>
                        <button className='back-btn'>{Translations[context].back}</button>
                    </Link>
                </div>)}
        </div>
    
    )
}

export default Ballot;