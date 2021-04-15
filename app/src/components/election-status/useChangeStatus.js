import {React, useState, useContext} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';


const useChangeStatus = (stat) =>{

    const [status, setStatus] = useState(stat);
    const [context, ] = useContext(LanguageContext);

    

    

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

    const getStatus = () => {

        switch (status){
            case '-1':
                return 'status not retrieved';           
            case '1':
                return <span>
                    <span className='election-status-on'></span>
                    <span className='election-status-text'>{Translations[context].statusOpen}</span>
                    <button className='election-btn' onClick={() => {if(window.confirm(Translations[context].confirmCloseElection))handleClose();}}>{Translations[context].close}</button>
                    <button className='election-btn' onClick={() => {if(window.confirm(Translations[context].confirmCancelElection))handleCancel();}}>{Translations[context].cancel}</button>
                </span>;  
            case '2':
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>{Translations[context].statusClose}</span>
                    <button className='election-btn'>{Translations[context].seeResults}</button>
                </span>;  
            case '3':
                return <span>
                    <span className='election-status-cancelled'></span>
                    <span className='election-status-text'>{Translations[context].statusCancel}</span>
                </span>;  

            default :
                return 'couldnt match status number';
            };
    } 

    return {getStatus};
};

export default useChangeStatus;