import {React, useState, useEffect, useContext} from 'react';
import Ballot from './Ballot';
import './CastBallot.css';
import useFetchData from '../useFetchData';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


function CastBallot(){


 
    const {loading,electionRetrieved, electionData} =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1'); 
    const [context, setContext] = useContext(LanguageContext);

    const [choice, setChoice] = useState('');
    const [errors, setErrors] = useState({});
    const [lastVote, setLastVote] = useState('');


    useEffect(()=> {
        fetchItems();
    }, []); /*!!!! need to check what this empty array means */ 


    const fetchItems = async() => {
        
        let choiceCached = sessionStorage.getItem('myVote');
        setChoice(choiceCached);
        setLastVote(choiceCached);

    } 

    const handleCheck = (choiceSelected) =>{
            setChoice(choiceSelected);
    }

    const sendBallot = () =>{
        /*TODO: API call to send ballot to backend */

        sessionStorage.setItem('myVote', choice);

        alert(Translations[context].voteSuccess)
    }

    const handleClick = () => {
        console.log(choice);
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