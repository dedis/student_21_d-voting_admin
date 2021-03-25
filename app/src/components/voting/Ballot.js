import {React,useState} from 'react';
import './Ballot.css';

function Ballot(props){
    const electionData = props.electionData;
    const choices = electionData.candidates; //array containing the possible candidates
    
    const [choiceSelected, setChoice] = useState('');

    const handleChange = e => {
        //setChoice(e.target.value);
        props.handleCheck(e.target.value);
    }


    return (
        <div className='ballot'>
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
    )
}

export default Ballot;