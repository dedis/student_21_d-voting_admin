import {React, useState, useEffect} from 'react';


const useChangeStatus = (stat) =>{

    const [status, setStatus] = useState(stat);
    

    const handleClose = () =>{
        /*TODO: API call to close election*/
        console.log('close');
        setStatus('2');

    }

    const handleCancel = () =>{
        /*TODO: API call to cancel election*/


        setStatus('3');
    }

    const handleResult = () => {
        /*TODO: API call to get result OR already got result when retrieved election?*/
    }

    const getStatus = () => {
        console.log('getStatus');
        console.log(status);
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
                    {console.log("closed")}

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

    return {getStatus};
};

export default useChangeStatus;