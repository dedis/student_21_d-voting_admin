import React, {useContext} from 'react';


import './Election.css';
import ElectionTable from './ElectionTable';
import useRetrieveElection from '../utils/useRetrieveElection';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


/*Assumption : for now an election is simply a json file with the following field
    - electionName: string
    - candidates: []string
    - electionStatus : number
    - collectivePublicKey :
    - electionID :
*/

function Election() {


    const [context, ] = useContext(LanguageContext);
    const electionID = localStorage.getItem('electionIDs');
    
    const [loading,electionRetrieved, error, electionData] =  useRetrieveElection(electionID, sessionStorage.getItem('token'));


    


         
    /*Show all the elections retrieved if any */
    const showElection = ()=>{
        return (
            <div>
                {electionRetrieved? (<div>
                {Translations[context].clickElection}
            <div classeName = 'election-table-wrapper'>
            <ElectionTable value={{'name': electionData.Title, 'status': electionData.Status}} electionID={electionID} />
            </div>   

        </div>):<div>{Translations[context].noElection}</div>}
            </div>
        )
    }

  return (
    <div className='election-wrapper'>
        {Translations[context].listElection}
    {!loading?
        (   
            showElection() )   
    : <p className='loading'>{Translations[context].loading}</p>}
    </div>
  );
}


export default Election;

/* https://60475e95b801a40017ccbff6.mockapi.io/api/election */

