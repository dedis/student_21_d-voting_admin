import {React, useState, useContext, useEffect} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';
import usePostCall from '../utils/usePostCall';
import {CLOSE_ENDPOINT, CANCEL_ENDPOINT, DECRYPT_ENDPOINT, SHUFFLE_ENDPOINT} from '../utils/Endpoints';
import {OPEN, CLOSED, SHUFFLED_BALLOT, RESULT_AVAILABLE, CANCELED} from '../utils/StatusNumber';
/*Custom hook that can display the status of an election and enable changes of status (closing, cancelling,...)*/ 
const useChangeStatus = (status, electionID, candidates, setStatus, setResultAvailable=null, setTextModalError, setShowModalError) =>{

    //const [status, setStatus] = useState(stat);
    const userID = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    const [context, ] = useContext(LanguageContext);
    const [isClosing, setIsClosing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const [isDecrypting, setIsDecrypting] = useState(false);
    const [showModalClose, setShowModalClose] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [userValidateClose, setUserValidateClose] = useState(false);
    const [userValidateCancel, setUserValidateCancel] = useState(false);
    const modalClose =  <ConfirmModal id='close-modal'showModal={showModalClose} setShowModal={setShowModalClose} textModal = {Translations[context].confirmCloseElection} setUserValidate={setUserValidateClose} />;
    const modalCancel =  <ConfirmModal showModal={showModalCancel} setShowModal={setShowModalCancel} textModal = {Translations[context].confirmCancelElection}  setUserValidate={setUserValidateCancel} />;
   //const [textModalError, setTextModalError] = useState(Translations[context].operationFailure);
    //const modalError = <Modal showModal={showModalError} setShowModal={setShowModalError} textModal = {textModalError} buttonRight={Translations[context].close} />;
    const [postError, setPostError] = useState(Translations[context].operationFailure);
    const {postData} = usePostCall(setPostError); 
    const simplePostRequest = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
    }
    const address1 = 'RjEyNy4wLjAuMToyMDAx'; //address of a collective authority member
    const PK1 = 'kCDSlI7BVzptjzy1RwGl2ggs1rUKeGx8lFFqUbHS0B0=';
    const address2 = 'RjEyNy4wLjAuMToyMDAy';
    const PK2 = 'wDZN6wVqtGdEl0rGNYqvqqdw1dLKV6bK1yMUQKVs3KE=';
    const address3 = 'RjEyNy4wLjAuMToyMDAz';
    const PK3 = 'NJLV0O4FbnEw3JQLcig6guuDYo9BY87n9MSKscXtfzE=';
    const CollectiveAuthorityMembers = [{'Address' : address1,'PublicKey':PK1}, {'Address' : address2,'PublicKey':PK2}, {'Address' : address3,'PublicKey':PK3}];
    const shuffleRequest = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token, 'Members': CollectiveAuthorityMembers})
    }



    useEffect(()=>{
        if(postError !== null){
                setTextModalError(postError);          
        }       
    }, [postError])

    useEffect(async() => {        
            //check if close button was clicked and the user validated the confirmation window
            if(isClosing && userValidateClose){
                const closeSuccess = await postData(CLOSE_ENDPOINT, simplePostRequest, setIsClosing);            
                if(closeSuccess){
                    setStatus(CLOSED);
                } else {
                    
                    //setTextModalError(postError);                   
                    setShowModalError(true);

                }
                setUserValidateClose(false);
                console.log(postError);
                //setPostError(null);
        }
    }, [isClosing, showModalClose])
    

    useEffect(async() => {
        if(isCanceling && userValidateCancel) {
            const cancelSuccess = await postData(CANCEL_ENDPOINT, simplePostRequest, setIsCanceling);
            if(cancelSuccess){
                setStatus(CANCELED);
            } else {
                setShowModalError(true);
            }
            setUserValidateCancel(false);   
            setPostError(null);        
        } 
    }, [isCanceling, showModalCancel])


    const handleClose = () =>{     
        setShowModalClose(true);
        setIsClosing(true);       
    }

    const handleCancel = () =>{
        setShowModalCancel(true);      
        setIsCanceling(true); 
    }

    const handleShuffle = async() => {
        setIsShuffling(true);
        const shuffleSuccess = await postData(SHUFFLE_ENDPOINT,shuffleRequest,setIsShuffling);
        if(shuffleSuccess && postError === null){
            setStatus(SHUFFLED_BALLOT);
        } else{
            setShowModalError(true);
        }
        setPostError(null);
    }

    const handleDecrypt = async() => {
        const decryptSucess = await postData(DECRYPT_ENDPOINT, simplePostRequest, setIsDecrypting);
        if(decryptSucess && postError === null){
            if(setResultAvailable !== null){
                setResultAvailable(true);
            }        
            setStatus(RESULT_AVAILABLE);
        } else {
            setShowModalError(true);
        }
        setPostError(null);
    }

    const getStatus = () => {

        switch (status){     
            case OPEN: 
                return <span>
                    <span className='election-status-on'></span>
                    <span className='election-status-text'>{Translations[context].statusOpen}</span>
                    
                    <button id='close-button' className='election-btn' onClick={handleClose}>{Translations[context].close}</button>
                    <button className='election-btn' onClick={handleCancel}>{Translations[context].cancel}</button>
                </span>;  
            case CLOSED: 
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>{Translations[context].statusClose}</span>
                    <button className='election-btn' onClick={handleShuffle}>{Translations[context].shuffle}</button>
                </span>; 
            case SHUFFLED_BALLOT: 
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>{Translations[context].statusClose}</span>
                    <button className='election-btn' onClick={handleDecrypt}>{Translations[context].decrypt}</button>
                </span>;
            case RESULT_AVAILABLE: 
                return <span>
                    <span className='election-status-closed'></span>
                    <span>{Translations[context].resultsAvailable }</span>
                </span>;               
            case CANCELED: 
                return <span>
                    <span className='election-status-cancelled'></span>
                    <span className='election-status-text'>{Translations[context].statusCancel}</span>
                </span>;  

            default :
                return null //TODO
            }
    } 

    return {getStatus, modalClose, modalCancel};
};

export default useChangeStatus;