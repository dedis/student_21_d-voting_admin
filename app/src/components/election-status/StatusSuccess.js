import React from 'react';

import useChangeStatus from './useChangeStatus';

const StatusSuccess = (props) => {
    const {getStatus} = useChangeStatus(props.stat);
    
    return (
        <span className='status-success-container'>
            {getStatus()}
        </span>
    )
}

export default StatusSuccess;