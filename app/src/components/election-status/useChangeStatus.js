import {React, useState, useContext, useEffect} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';


const useChangeStatus = (stat) =>{

    const [status, setStatus] = useState(stat);
    const [context, ] = useContext(LanguageContext);

    const [showModalClose, setShowModalClose] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [userValidate, setUserValidate] = useState(false);
    const modalClose =  <ConfirmModal showModal={showModalClose} setShowModal={setShowModalClose} textModal = {Translations[context].confirmCloseElection} setUserValidate={setUserValidate} />;
    const modalCancel =  <ConfirmModal showModal={showModalCancel} setShowModal={setShowModalCancel} textModal = {Translations[context].confirmCancelElection}  setUserValidate={setUserValidate} />;

    useEffect(() => {
        if(userValidate === true) {
            /*TODO: API call to close election*/

            setStatus('2');
        }; 
        setUserValidate(false);
    }, [showModalClose])

    useEffect(() => {
        if(userValidate === true) {
            /*TODO: API call to cancel election*/
            
            setStatus('3');
        }; 
        setUserValidate(false);
    }, [showModalCancel])

    

    const handleClose = () =>{    
        setShowModalClose(prev => !prev);
    }

    const handleCancel = () =>{
        setShowModalCancel(prev => !prev);       
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
                    
                    <button className='election-btn' onClick={handleClose}>{Translations[context].close}</button>
                    <button className='election-btn' onClick={handleCancel}>{Translations[context].cancel}</button>
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

    return {getStatus, modalClose, modalCancel};
};

export default useChangeStatus;