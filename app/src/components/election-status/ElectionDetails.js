import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';
import Status from './Status';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useElection from '../utils/useElection';


function ElectionDetails(props) { //props.location.data = id of the election

    const [context, ] = useContext(LanguageContext);
    //const [loading, electionRetrieved, error, electionData] =  useRetrieveElection(props.location.data, sessionStorage.getItem('token'));
    const {loading,title,candidates,id,status,pubKey,result, setResult, setStatus} = useElection(props.location.data,sessionStorage.getItem('token'));

    
    return (
        <div>
        {!loading?
        (<div>
            <h1>{Translations[context].electionDetails}</h1>
            {console.log(result)}
            <div className='election-wrapper'>
                <div className='election-title'>{title}</div>
                {Translations[context].status} <Status status={status} electionID={id} setResult={setResult} />
                <div className='election-candidates'>
                        {Translations[context].candidates}
                        {candidates.map((cand) => 
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