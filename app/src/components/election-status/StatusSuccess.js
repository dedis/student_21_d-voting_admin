import React from 'react';

import useChangeStatus from './useChangeStatus';

/*StatusSuccess is a class that acts as a container for the status of an election*/
const StatusSuccess = (props) => {
    const {getStatus, modalClose, modalCancel} = useChangeStatus(props.stat);
    
    return (
        <span className='status-success-container'>
            {modalClose}
            {modalCancel}
            {getStatus()}
        </span>
    )
}

export default StatusSuccess;