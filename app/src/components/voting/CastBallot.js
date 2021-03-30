import {React, useState, useEffect} from 'react';
import Ballot from './Ballot';
import './CastBallot.css';


function CastBallot(){


    const [election, setElection] = useState({});
    const [loading, setLoading] = useState(true); 

    const [choice, setChoice] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(()=> {
        fetchItems();
    }, []); /*!!!! need to check what this empty array means */ 


    const fetchItems = async() => {
        const response = await fetch('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1');   
        const items = await response.json();

        setElection(items);
        setLoading(false);

    } 

    const handleCheck = (choiceSelected) =>{
            setChoice(choiceSelected);
    }

    const sendBallot = () =>{
        /*TODO: API call to send ballot to backend */


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
        sendBallot();
        setChoice('');
        setErrors({});
    }

    return (
        <div className = 'cast-ballot'>
            <span className='ballot-indication'>You are allowed to vote on the election below</span>
            {!loading?(<div className='cast-ballot-card'>
                    <Ballot electionData={election} choice={choice} handleCheck = {handleCheck}></Ballot>
                    <div className='cast-ballot-error'>{errors.noCandidate}</div>
                    <button className='cast-ballot-btn' onClick={handleClick}>Cast vote</button>
                </div>) : <p></p>}

            
        </div>
    )
}

export default CastBallot;