import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';
import useFetchData from '../useFetchData';
import StatusSuccess from './StatusSuccess';


function ElectionDetails(props) {

    //TODO: later on, props will be an id to then make a custom https request
    const {loading, electionRetrieved, electionData} =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1');
    
    /*The data related to the election params is in props.location.data */
    //const candidates = props.location.data.candidates;
    
    return (
        <div>
            
        {!loading?
        (<div className='election-wrapper'>
            <h1>Election details</h1>
            
            <div className='election-title'>{electionData.electionName}</div>
            <div className='election-start-date'>Start date: fakeDate</div>
            Status: <StatusSuccess stat={electionData.electionStatus} />
            <div className='election-candidates'>
                    Candidates:
                    {electionData.candidates.map((cand) => 
                    <li key={cand} className='election-candidate'>{cand}</li>)}
            </div>
                    
            <Link to='/elections'>
            <button className='back-btn'>Back</button>
            </Link>
        </div>):<p></p>
    }
    </div>

    );


}




export default ElectionDetails;