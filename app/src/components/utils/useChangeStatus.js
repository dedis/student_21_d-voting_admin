import {React, useState, useContext, useEffect} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';
import useCloseElection from '../utils/useCloseElection';
import useCancelElection from '../utils/useCancelElection';

/*Custom hook that display the status of an election and enable changes of status (closing, cancelling,...)*/ 
const useChangeStatus = (stat, electionID) =>{

    const [status, setStatus] = useState(stat);
    const [context, ] = useContext(LanguageContext);
    const [isClosing, setIsClosing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const {closeElection} = useCloseElection(setIsClosing);
    const {cancelElection} = useCancelElection(setIsCanceling);
    const [showModalClose, setShowModalClose] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [userValidateClose, setUserValidateClose] = useState(false);
    const [userValidateCancel, setUserValidateCancel] = useState(false);
    const modalClose =  <ConfirmModal showModal={showModalClose} setShowModal={setShowModalClose} textModal = {Translations[context].confirmCloseElection} setUserValidate={setUserValidateClose} />;
    const modalCancel =  <ConfirmModal showModal={showModalCancel} setShowModal={setShowModalCancel} textModal = {Translations[context].confirmCancelElection}  setUserValidate={setUserValidateCancel} />;

    useEffect(() => {
        
            /*TODO: API call to close election*/
            //check if close button was clicked and the user validate the confirmation window
            if(isClosing && userValidateClose){
                const closeSuccess = closeElection(electionID, sessionStorage.getItem('id'), sessionStorage.getItem('token'));
                if(closeSuccess){
                    setStatus(2);
                } else {
                    //TODO : show error message that closing election wasn't successful
                }
                setUserValidateClose(false);
        }
 
    }, [isClosing, showModalClose])
    

    useEffect(() => {
        if(isCanceling && userValidateCancel) {
            /*TODO: API call to cancel election*/
            const cancelSuccess = cancelElection(electionID, sessionStorage.getItem('id'), sessionStorage.getItem('token'));
            if(cancelSuccess){
                setStatus(6);
            } else {

            }
            setUserValidateCancel(false);
            
        }; 
    }, [isCanceling, showModalCancel])

    

    const handleClose = () =>{    
        
        setShowModalClose(prev => !prev);
        setIsClosing(true);
    }

    const handleCancel = () =>{
        setShowModalCancel(prev => !prev);      
        setIsCanceling(true); 
    }

    const handleResult = () => {
        /*TODO: API call to get result OR already got result when retrieved election?*/
    }

    const getStatus = () => {

        switch (status){
            case -1:
                return 'status not retrieved';           
            case 1:
                return <span>
                    <span className='election-status-on'></span>
                    <span className='election-status-text'>{Translations[context].statusOpen}</span>
                    
                    <button className='election-btn' onClick={handleClose}>{Translations[context].close}</button>
                    <button className='election-btn' onClick={handleCancel}>{Translations[context].cancel}</button>
                </span>;  
            case 2:
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>{Translations[context].statusClose}</span>
                    <button className='election-btn'>{Translations[context].seeResults}</button>
                </span>;  
            case 6:
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