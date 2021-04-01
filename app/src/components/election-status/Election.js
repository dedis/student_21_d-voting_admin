import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

import './Election.css';
import ElectionTable from './ElectionTable';
import useFetchData from '../useFetchData';
import StatusSuccess from './StatusSuccess';

/*Assumption : for now an election is simply a json file with the following field
    - electionName: string
    - candidates: []string
    - electionStatus : number
    - collectivePublicKey :
    - electionID :
*/

function Election() {


    
    
    const {loading,electionRetrieved, data} =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/100');


    


         
    /*Show all the elections retrieved if any */
    const showElection = ()=>{
        return (
            <div>
                {electionRetrieved? (<div>
            Click on the election name to display additional details.
            <div classeName = 'election-table-wrapper'>
            <ElectionTable value={{'name': data.electionName, 'status': data.electionStatus}} candidates = {data.candidates} />
            </div>   

        </div>):<div>No election were retrieved!</div>}
            </div>
        )
    }

  return (
    <div className='election-wrapper'>
        This page lists all the elections that have ever been created. 
    {!loading?
        (   
            showElection() )   
    : <p className='loading'>Loading...</p>}
    </div>
  );
}


export default Election;

/* https://60475e95b801a40017ccbff6.mockapi.io/api/election */

