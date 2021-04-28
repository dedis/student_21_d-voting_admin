import {React, useState, useEffect, useContext} from 'react';
import Ballot from './Ballot';
import './CastBallot.css';
import useFetchData from '../useFetchData';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import Modal from '../modal/Modal';
import kyber from "@dedis/kyber";
import {encryptVote} from './VoteEncrypt';

/*
Functional component
*/

function CastBallot(){

    const [loading,electionRetrieved, electionData] =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1', true); 
    const [context, ] = useContext(LanguageContext);

    const castBallotEndPoint = "/evoting/cast";
    const edCurve = kyber.curve.newCurve("edwards25519")

    const [choice, setChoice] = useState('');
    const [errors, setErrors] = useState({});
    const [lastVote, setLastVote] = useState('');
    const [showModal, setShowModal] = useState(false);


    useEffect(()=> {
        fetchItems();
    }, []); 


    const fetchItems = async() => {  
        let choiceCached = sessionStorage.getItem('myVote');
        setChoice(choiceCached);
        setLastVote(choiceCached);

    } 

    const handleCheck = (choiceSelected) =>{
            setChoice(choiceSelected);
    }

    function unpack(str) {
        var bytes = [];
        var b  =str.split(",");
        
        for(var i = 0; i < b.length; i++) {
            var char = parseInt(b[i]);
            bytes.push(char);
        }

        return new Uint8Array(bytes);
    }

   
    
    const sendBallot = async() =>{
        const ballot = {};
       
        sessionStorage.setItem('myVote', choice);

        setShowModal(prev => !prev);
        
        const [K,C] = encryptVote(choice,Buffer.from(unpack(sessionStorage.getItem('pubKey')).buffer), edCurve);

        const KBuff = K.toProto();
        const CBuff = C.toProto();
        //transform buffer to []number
        const vote = [...Buffer.concat([KBuff,CBuff])].map(x => parseInt(x,10));

        ballot['ElectionID'] = 0; //TODO: how to deal with id?
        ballot['UserId'] = sessionStorage.getItem('id');       
        ballot['Ballot'] = vote;
        ballot['Token'] = sessionStorage.getItem('token');
        console.log(C);
        //sending the ballot to evoting server
        try{
            const response = await fetch(castBallotEndPoint, {
                method: 'POST',
                body: JSON.stringify(ballot)
            });
        /*TODO:Need to deal with the response */
            if(response.ok){
            const data = await response.json();
            console.log(data);
            return ;
            } else{
                console.log("ERROR!")
                return (-1);
            }

 
        } catch(e) {
            
            return e;
        }


    }

    const handleClick = () => {
        let errors = {};
        if(choice === ''){
            errors['noCandidate'] = Translations[context].noCandidate
            setErrors(errors);
            return;
        }
        setLastVote(choice);
        sendBallot();
        //setChoice('');
        setErrors({});
    }

    const showBallot = () => {
        return (
            <div>
                <Modal showModal={showModal} setShowModal={setShowModal} textModal = {Translations[context].voteSuccess} buttonRight={Translations[context].close} />
                {electionRetrieved? 
                /* TODO: check that the election is open */
                (<div className='cast-ballot-card'>
                <Ballot electionData={electionData} choice={choice} handleCheck = {handleCheck} lastVote={lastVote}></Ballot>
                <div className='cast-ballot-error'>{errors.noCandidate}</div>
                <button className='cast-ballot-btn' onClick={handleClick}>{Translations[context].castVote}</button>
                </div>)
                : <p>{Translations[context].noVote}</p>}
            </div>

        )


    }

    return (
        <div className = 'cast-ballot'>
            <div className='ballot-indication'>{Translations[context].voteAllowed}</div>
            {!loading? showBallot() : <p></p>}

            
        </div>
    )
}

export default CastBallot;