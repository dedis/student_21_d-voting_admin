import React, {useContext} from 'react';


import './Election.css';
import ElectionTable from './ElectionTable';

import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useFetchCall from '../utils/useFetchCall';
import {GET_ALL_ELECTIONS_ENDPOINT} from '../utils/Endpoints';

/*Assumption : for now an election is simply a json file with the following field
    - electionName: string
    - candidates: []string
    - electionStatus : number
    - collectivePublicKey :
    - electionID :
*/

function Election() {


    const [context, ] = useContext(LanguageContext);
    //const electionID = localStorage.getItem('electionIDs'); //this will not be present in the final version
    
    //const [loading,electionRetrieved, , electionData] =  useRetrieveAllElections(sessionStorage.getItem('token'));
    //const [loading,electionRetrieved, , electionData] =  useRetrieveElection(electionID, sessionStorage.getItem('token'));
    const token = sessionStorage.getItem('token');
    const request = {
        method: 'POST',
        body: JSON.stringify({'Token': token})
    }
    const [data, loading, error] = useFetchCall(GET_ALL_ELECTIONS_ENDPOINT, request);


    /*Show all the elections retrieved if any */
    const showElection = ()=>{
        return (
            <div>
                {data.AllElectionsInfo.length > 0 ? (<div>
                {Translations[context].clickElection}
                    <div className = 'election-table-wrapper'>
                        <ElectionTable elections={data.AllElectionsInfo} />
                    </div>   
                </div>):<div>{Translations[context].noElection}</div>}
            </div>
        )
    }

  return (
    <div className='election-wrapper'>
        {Translations[context].listElection}
    {!loading?
        (showElection() )   
        : 
        (error===null?<p className='loading'>{Translations[context].loading}</p>:<div className='error-retrieving'>{Translations[context].errorRetrievingElection}</div>)}
    </div>
  );
}

export default Election;

/* https://60475e95b801a40017ccbff6.mockapi.io/api/election */

