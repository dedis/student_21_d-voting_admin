import React, {useContext, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';
import Status from './Status';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useElection from '../utils/useElection';




function ElectionDetails(props) { //props.location.data = id of the election
    const token = sessionStorage.getItem('token');
    const [context, ] = useContext(LanguageContext);
    const getElectionResultEndpoint = "/evoting/result";
    
    const {loading,title,candidates,electionID,status,pubKey,result, setResult, setStatus} = useElection(props.location.data,token);
    const [loadingResult, setLoadingResult] = useState(false);
    const [error, setError] = useState(null);  
    const [resultAvailable, setResultAvailable] = useState(false); 
   
    
    useEffect(async() => {
        if(status===5 && resultAvailable){
            setLoadingResult(true);
            const resultRequest = {
                method: 'POST',
                body: JSON.stringify({'ElectionID':electionID,'Token': token})
            }
            try{
                const response = await fetch(getElectionResultEndpoint,resultRequest);
    
                if(!response.ok){
                    throw Error(response.statusText);
                } else {
                    let dataReceived = await response.json();
                    setResult(dataReceived);
                    setLoadingResult(false);
                }
            } catch(error){
                setError(error);
                console.log(error);
            }
        }
    }, [status, resultAvailable])
    return (
        <div>
        {!loading?
        (<div>
            <h1>{Translations[context].electionDetails}</h1>
            <div className='election-wrapper'>
                <div className='election-title'>{title}</div>
                {Translations[context].status} <Status status={status} electionID={electionID} candidates={candidates} setStatus={setStatus} setResultAvailable={setResultAvailable} />
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