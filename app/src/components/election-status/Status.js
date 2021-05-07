import React from 'react';
import useChangeStatus from '../utils/useChangeStatus';

/*StatusSuccess is a class that acts as a container for the status of an election
it also contains the two modals for closing and cancelling an election*/
const StatusSuccess = (props) => {
    const {getStatus, modalClose, modalCancel} = useChangeStatus(props.stat, props.electionID);
    
    return (
        <span className='status-success-container'>
            {modalClose}
            {modalCancel}
            {getStatus()}
        </span>
    )
}

export default StatusSuccess;