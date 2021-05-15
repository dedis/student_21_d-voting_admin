import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';
import useRetrieveElection from '../utils/useRetrieveElection';
import Status from './Status';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


function ElectionDetails(props) { //props.location.data = id of the election

    const [context, ] = useContext(LanguageContext);
    const [loading, electionRetrieved, error, electionData] =  useRetrieveElection(props.location.data, sessionStorage.getItem('token'));
    
    const resultAvailable = () => {

    }
    return (
        <div>
        {!loading?
        (<div>
            <h1>{Translations[context].electionDetails}</h1>
            <div className='election-wrapper'>
                <div className='election-title'>{electionData.Title}</div>
                {Translations[context].status} <Status stat={electionData.Status} electionID={props.location.data} />
                <div className='election-candidates'>
                        {Translations[context].candidates}
                        {electionData.Candidates.map((cand) => 
                        <li key={cand} className='election-candidate'>{cand}</li>)}
                </div>                 
                <Link to='/elections'>
                    <button className='back-btn'>{Translations[context].back}</button>
                </Link>
            </div> 
        </div>):<p></p>
    }
    </div>

    );


}




export default ElectionDetails;