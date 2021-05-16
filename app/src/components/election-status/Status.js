import React from 'react';
import useChangeStatus from '../utils/useChangeStatus';
import './Status.css';

/*StatusSuccess is a class that acts as a container for the status of an election
it also contains the two modals for closing and cancelling an election*/
const Status = (props) => {
    const {getStatus, modalClose, modalCancel} = useChangeStatus(props.status, props.electionID, props.candidates, props.setStatus, props.setResultAvailable);
    
    return (
        <div className='status-container'>
            {modalClose}
            {modalCancel}
  
            {getStatus()}
        </div>
    )
}

export default Status;