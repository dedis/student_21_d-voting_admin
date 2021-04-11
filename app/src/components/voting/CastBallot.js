import {React, useState, useEffect} from 'react';
import Ballot from './Ballot';
import './CastBallot.css';
import useFetchData from '../useFetchData';


function CastBallot(){


 
    const {loading,electionRetrieved, electionData} =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1'); 

    const [choice, setChoice] = useState('');
    const [errors, setErrors] = useState({});
    const [lastVote, setLastVote] = useState('');


    useEffect(()=> {
        fetchItems();
    }, []); /*!!!! need to check what this empty array means */ 


    const fetchItems = async() => {
        
        let choiceCached = sessionStorage.getItem('myVote');
        setChoice(choiceCached);

    } 

    const handleCheck = (choiceSelected) =>{
            setChoice(choiceSelected);
    }

    const sendBallot = () =>{
        /*TODO: API call to send ballot to backend */

        sessionStorage.setItem('myVote', choice);

        alert('Your vote was successfully submitted!')
    }

    const handleClick = () => {
        console.log(choice);
        let errors = {};
        if(choice === ''){
            errors['noCandidate'] = 'You need to select a candidate.'
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
                {electionRetrieved? 
                (<div className='cast-ballot-card'>
                
                <Ballot electionData={electionData} choice={choice} handleCheck = {handleCheck}></Ballot>
                <div className='cast-ballot-error'>{errors.noCandidate}</div>
                <button className='cast-ballot-btn' onClick={handleClick}>Cast vote</button>
                </div>)
                : <p>There is currently nothing to vote on.</p>}
            </div>

        )


    }

    return (
        <div className = 'cast-ballot'>
            <div className='ballot-indication'>You are allowed to vote on the election below.</div>
            {!loading? showBallot() : <p></p>}

            
        </div>
    )
}

export default CastBallot;