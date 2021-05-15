import React, {useContext} from 'react';


import './Election.css';
import ElectionTable from './ElectionTable';
import useRetrieveElection from '../utils/useRetrieveElection';
import useRetrieveAllElections from '../utils/useRetrieveAllElections';
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
    const electionID = localStorage.getItem('electionIDs'); //this will not be present in the final version
    
    const [loading,electionRetrieved, , electionData] =  useRetrieveAllElections(sessionStorage.getItem('token'));
    //const [loading,electionRetrieved, , electionData] =  useRetrieveElection(electionID, sessionStorage.getItem('token'));
   
    /*Show all the elections retrieved if any */
    const showElection = ()=>{
        return (
            <div>
                {electionRetrieved? (<div>
                {Translations[context].clickElection}
                {console.log(electionData)}
            <div classeName = 'election-table-wrapper'>
            <ElectionTable value={electionData} electionID={electionData.electionID} candidates={electionData.Candidates} />
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

