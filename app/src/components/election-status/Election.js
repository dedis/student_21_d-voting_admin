import React, {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

import './Election.css';
import ElectionTable from './ElectionTable';

/*Assumption : for now an election is simply a json file with the following field
    - electionName: string
    - candidates: []string
    - electionStatus : number
    - collectivePublicKey :
    - electionID :
*/

function Election() {

    /*Election fields that will be retrieved from get request */
    const [electionName, setName] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [electionStatus, setStatus] = useState(-1);
    

    const [electionData,setData] = useState({});
    

    const[showDetails, setShowDetails] = useState(false);

    useEffect(()=> {
        fetchItems();
    }, []); /*!!!! need to check what this empty array means */ 


    const fetchItems = async() => {
        const response = await fetch('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1');
        
        const items = await response.json();
        setName(items.electionName);
        setCandidates(items.candidates);
        setStatus(items.electionStatus);

        setData(items);
 
    } 
    
    const handleClick = () =>{
        setShowDetails(!showDetails);
    }

    const handleClose = () =>{
        /*TODO: API call to close election*/


        setStatus('2');
    }

    const handleCancel = () =>{
        /*TODO: API call to cancel election*/


        setStatus('3');
    }

    const handleResult = () => {
        /*TODO: API call to get result OR already got result when retrieved election?*/
    }

    const getStatus = (status) => {

        switch (status){
            case '-1':
                 return 'status not retrieved';           
            case '1':
                return <span>
                    <span className='election-status-on'></span>
                    <span className='election-status-text'>open</span>
                    <button className='election-btn' onClick={() => {if(window.confirm('Are you sure you want to close this election?'))handleClose();}}>Close</button>
                    <button className='election-btn' onClick={() => {if(window.confirm('Are you sure you want to cancel this election?'))handleCancel();}}>Cancel</button>
                </span>;  
            case '2':
                 return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>closed</span>
                    <button className='election-btn'>See results</button>
                 </span>;  
            case '3':
                return <span>
                    <span className='election-status-cancelled'></span>
                    <span className='election-status-text'>cancelled</span>
                </span>;  

            default :
                  return 'couldnt match status number';
               };
    }  

  return (
    <div className='election-wrapper'>
        <h3>Election status</h3  >
        This page lists all the elections that have ever been created. Click on the election name to display additional details.

        <div classeName = 'election-table-wrapper'>
            <ElectionTable value={{'name': electionName, 'status': electionStatus}} candidates = {candidates} getStatus = {getStatus} handleClick={handleClick}/>
        </div>   
        <div className='election-details'>
               {showDetails? 
               (<div>
                   
               <ElectionInfoCard candidates={candidates} /> 
               </div>):<span></span>}
               
          </div>   

    </div>
  );
}


/* */
function ElectionInfoCard(candidates){

    return (
        <div className='election-candidates'>
                Candidates:
                {candidates.candidates.map(cand => 
                <li key={cand} className='election-candidate'>{cand}</li>)}
        </div>

    )
} 



export default Election;

/* https://60475e95b801a40017ccbff6.mockapi.io/api/election */

