import {React,useState} from 'react';
import './Ballot.css';

function Ballot(props){
    const electionData = props.electionData;
    const choices = electionData.candidates; //array containing the possible candidates
    
    

    const handleChange = e => {
        //setChoice(e.target.value);
        props.handleCheck(e.target.value);
    }


    return (
        <div className='ballot'>
            <div className = 'ballot-wrapper'>
                {props.lastVote !== '' ?
                    (<div className='past-vote'>You have already voted for <b>{props.lastVote}</b> on this election.
                    <br />
                    You can change your vote by simply casting a new vote.</div>): (<span></span>)
                    }
                <h3 className = 'ballot-title'>{electionData.electionName}</h3>
                <div className='checkbox-text'>Pick one candidate</div>
                {choices.length !== 0 ?
                choices.map(choice => (
                    <div className='checkbox-full'>
                        <input 
                        type='checkbox'
                        key={choice}
                        className = 'checkbox-choice'
                        value = {choice}
                        checked = {(props.choice === choice)? true:false} //only one checkbox can be selected
                        onChange = {handleChange}
                        />
                        <label className='checkbox-label'>
                            {choice}
                        </label>
                    </div>
                ) ) : <p>Default</p>}
            </div>
        </div>
    )
}

export default Ballot;