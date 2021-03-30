import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';


function ElectionDetails(props) {

    /*The data related to the election params is in props.location.data */
    const candidates = props.location.data.candidates;
    
    return (
        <div className = 'election-details-wrapper'>
            <h1>Election details</h1>
            {console.log(props.location.data)}
            {console.log(candidates)}
            <div className='election-title'>{props.location.data.value.name}</div>
            <div className='election-start-date'>Start date: fakeDate</div>
            <div className='election-details-status'>Status: {props.location.data.getStatus(props.location.data.value.status)}</div>
            <div className='election-candidates'>
                    Candidates:
                    {candidates.map(cand => 
                    <li key={cand} className='election-candidate'>{cand}</li>)}
            </div>
            <Link to='/elections'>
            <button className='back-btn'>Back</button>
            </Link>
        </div>

    );


    const ElectionInfoCard = (candidates) =>{

        return (
            <div className='election-candidates'>
                    Candidates:
                    {candidates.candidates.map(cand => 
                    <li key={cand} className='election-candidate'>{cand}</li>)}
            </div>
    
        )
    }
}




export default ElectionDetails;