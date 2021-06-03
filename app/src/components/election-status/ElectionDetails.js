import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';
import Status from './Status';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useElection from '../utils/useElection';
import Result from './Result';
import {GET_RESULT_ENDPOINT} from '../utils/Endpoints';
import {RESULT_AVAILABLE} from '../utils/StatusNumber';
import PropTypes from 'prop-types';

function ElectionDetails(props) { //props.location.data = id of the election
    const token = sessionStorage.getItem('token');
    const [context, ] = useContext(LanguageContext);   
    const {loading,title,candidates,electionID,status,result, setResult, setStatus, isResultSet, setIsResultSet} = useElection(props.location.data,token);
    const [loadingResult, setLoadingResult] = useState(false);
    const [error, setError] = useState(null);  
    const [isResultAvailable, setIsResultAvailable] = useState(false); 

    // fetch result when available
    useEffect(async() => {
        if(status===RESULT_AVAILABLE && isResultAvailable){
            setLoadingResult(true);
            const resultRequest = {
                method: 'POST',
                body: JSON.stringify({'ElectionID':electionID,'Token': token})
            }
            try{
                const response = await fetch(GET_RESULT_ENDPOINT,resultRequest);
                if(!response.ok){
                    throw Error(response.statusText);
                } else {
                    let dataReceived = await response.json();
                    setResult(dataReceived.Result);
                    setLoadingResult(false);
                    setIsResultSet(true);
                }
            } catch(error) {
                setError(error);
            }
        }
    }, [status, isResultAvailable])

    return (
        <div className = 'election-details-box'>
        {!loading?
            (<div>
                <h1>{title}</h1>
                <div className='election-details-wrapper'>
                {isResultSet? <div className='election-wrapper-child'><Result resultData={result} candidates={candidates}/></div>
                    :(<div className='election-wrapper-child'> {Translations[context].status}:<Status status={status} electionID={electionID} candidates={candidates} setStatus={setStatus} setResultAvailable={setIsResultAvailable} /> 
                        <div className='election-candidates'>
                            {Translations[context].candidates}
                            {candidates.map((cand) => <li key={cand} className='election-candidate'>{cand}</li>)}
                        </div>      
                    </div>)}                           
                        <Link to='/elections'>
                            <button className='back-btn'>{Translations[context].back}</button>
                        </Link>               
                </div>   
            </div>)
            :(<p className='loading'>{Translations[context].loading}</p>)
        }
    </div>
    );
}

ElectionDetails.propTypes = {
    location : PropTypes.any,
}
export default ElectionDetails;