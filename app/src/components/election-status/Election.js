import React, {useContext} from 'react';


import './Election.css';
import ElectionTable from './ElectionTable';
import useFetchData from '../useFetchData';
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
    
    
    const {loading,electionRetrieved, electionData} =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1'); 


    


         
    /*Show all the elections retrieved if any */
    const showElection = ()=>{
        return (
            <div>
                {electionRetrieved? (<div>
                {Translations[context].clickElection}
            <div classeName = 'election-table-wrapper'>
            <ElectionTable value={{'name': electionData.electionName, 'status': electionData.electionStatus}} candidates = {electionData.candidates} />
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

