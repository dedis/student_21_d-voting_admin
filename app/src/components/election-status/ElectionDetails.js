import React, {useContext} from 'react';
import {Link} from 'react-router-dom';

import './ElectionDetails.css';
import useFetchData from '../useFetchData';
import StatusSuccess from './StatusSuccess';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


function ElectionDetails(props) {

    const [context, ] = useContext(LanguageContext);

    //TODO: later on, props will be an id to then make a custom https request
    const {loading, electionRetrieved, electionData} =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1');
    
    
    
    return (
        <div>
            
        {!loading?
        (<div>
            <h1>{Translations[context].electionDetails}</h1>
            <div className='election-wrapper'>
                <div className='election-title'>{electionData.electionName}</div>
                <div className='election-start-date'>{Translations[context].startDate} fakeDate</div>
                {Translations[context].status} <StatusSuccess stat={electionData.electionStatus} />
                <div className='election-candidates'>
                        {Translations[context].candidates}
                        {electionData.candidates.map((cand) => 
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