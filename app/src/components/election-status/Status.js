import React from 'react';
import useChangeStatus from '../utils/useChangeStatus';

/*StatusSuccess is a class that acts as a container for the status of an election
it also contains the two modals for closing and cancelling an election*/
const Status = (props) => {
    const {getStatus, modalClose, modalCancel, modalResult} = useChangeStatus(props.stat, props.electionID, props.candidates);
    
    return (
        <span className='status--container'>
            {modalClose}
            {modalCancel}
            {modalResult}
            {getStatus()}
        </span>
    )
}

export default Status;