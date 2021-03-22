import React, {useEffect,useState} from 'react';

import '../App.css';

/*Assumption : for now an election is simply a json file with the following field
    - electionName: string
    - candidates: []string
    - electionStatus : number
    - collectivePublicKey :
    - electionID :
*/

function Election() {

    useEffect(()=> {
        fetchItems();
    }, []);

    /*Election fields that will be retrieved from get request */
    const [electionName, setName] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [electionStatus, setStatus] = useState(-1);

    const[showDetails, setShowDetails] = useState(false);



    const fetchItems = async() => {
        const response = await fetch('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1');
        
        const items = await response.json();
        setName(items.electionName);
        setCandidates(items.candidates);
        setStatus(items.electionStatus);
    } 
    
    const handleClick = () =>{
        setShowDetails(!showDetails);
    }

    const handleClose = () =>{
        /*API call to close election*/


        setStatus('2');
    }

    const handleCancel = () =>{
        /*API call to cancel election*/


        setStatus('3');
    }

    const handleResult = () => {
        /*API call to get result OR already got result when retrieved election?*/
    }

    const getStatus = () => {

        switch (electionStatus){
            case '-1':
                 return 'status not retrieved';           
            case '1':
                return <span>
                    <span className='election-status-on'></span>
                    <span className='election-status-text'>open</span>
                    <button className='election-btn' onClick={handleClose}>Close</button>
                <button className='election-btn' onClick={handleCancel}>Cancel</button>
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

  const renderButton = (status) => {
        if(status === '1'){
            return <div className='election-ongoing'>
                <button className='election-btn' onClick={handleClose}>Close</button>
                <button className='election-btn' onClick={handleCancel}>Cancel</button>
                </div>
        }
        if(status === '2'){
            return <button className='election-btn'>See results</button>;
        }
        return;

  }  

  return (
    <div className='election-wrapper'>
        <h3>Election status</h3  >
        This page lists all the elections that have ever been created. Click on the election name to display additional details.
        <div className = 'election-overview'>
            <div className='election-name'>
                <span className='election-name-pointer' data-toggle='tooltip' title = 'Show details' onClick={()=> handleClick()}>{electionName}</span>
                <span className='tooltiptext'></span>
                <div className='election-status'>{getStatus(electionStatus)}</div>
                
            </div>
            
         </div> 
         
          
          <div className='election-details'>
               {showDetails? <ElectionInfoCard candidates={candidates} /> :<span></span>}
               
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
/*
function Status(status){
    const getStatus = () => {
        switch (status.status){
            case '-1':
                return 'status not retrieved'
            
            case '1':
                return 'on going';
            case '2':
                return 'closed';
            case '3':
                return 'canceled';

            default :
                return 'couldnt match status number';
        }
    }

    return(
        <span>
            {getStatus()}
        </span>
    )
}
*/



export default Election;

/* https://60475e95b801a40017ccbff6.mockapi.io/api/election */

