import {React,useContext} from 'react';
import './Ballot.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';

function Ballot(props){
    const electionData = props.electionData;
    const choices = electionData.candidates; //array containing the possible candidates
    const [context, setContext] = useContext(LanguageContext);
    

    const handleChange = e => {
        //setChoice(e.target.value);
        props.handleCheck(e.target.value);
    }


    return (
        <div className='ballot'>
            <div className = 'ballot-wrapper'>
                {console.log(props.lastVote)}
                {props.lastVote !== null ?

                    (
                    <div className='past-vote'>{Translations[context].alreadyVoted} <b>{props.lastVote}</b> {Translations[context].alreadyVoted2}
                    <br />
                    {Translations[context].changeVote}</div>): (<span></span>)
                    }
                <h3 className = 'ballot-title'>{electionData.electionName}</h3>
                <div className='checkbox-text'>{Translations[context].pickCandidate}</div>
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