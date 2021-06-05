import {React, useState, useContext, useEffect} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';
import usePostCall from './usePostCall';
import {CLOSE_ENDPOINT, CANCEL_ENDPOINT, DECRYPT_ENDPOINT, SHUFFLE_ENDPOINT} from './Endpoints';
import {OPEN, CLOSED, SHUFFLED_BALLOT, RESULT_AVAILABLE, CANCELED} from './StatusNumber';
import {Link} from 'react-router-dom';

const Action = (status, electionID, setStatus, setResultAvailable=null, setTextModalError, setShowModalError) => {
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
    const [postError, setPostError] = useState(Translations[context].operationFailure);
    const {postData} = usePostCall(setPostError); 
    const simplePostRequest = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
    }
    const address1 = 'RjEyNy4wLjAuMToyMDAx'; //address of a collective authority member
    const PK1 = 'sUTXcdSasLq/g0VORLVXDlk2dEW0oHYmitueOktxXHA=';
    const address2 = 'RjEyNy4wLjAuMToyMDAy';
    const PK2 = 'Pj2jpLKrOAtYDQkFg535WKXHEX7/7/DGdXf7d8PhiPc=';
    const address3 = 'RjEyNy4wLjAuMToyMDAz';
    const PK3 = 'LGLR7cfYr4pyep5groCC+8GwF6eaTtmvPvr0e+bmiVk=';
    const CollectiveAuthorityMembers = [{'Address' : address1,'PublicKey':PK1}, {'Address' : address2,'PublicKey':PK2}, {'Address' : address3,'PublicKey':PK3}];
    const shuffleRequest = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token, 'Members': CollectiveAuthorityMembers})
    }

    useEffect(()=>{
        if(postError !== null){
                setTextModalError(postError);   
                setPostError(null);       
        } 
    }, [postError])

    useEffect(async() => {        
            //check if close button was clicked and the user validated the confirmation window
            if(isClosing && userValidateClose){
                const closeSuccess = await postData(CLOSE_ENDPOINT, simplePostRequest, setIsClosing);            
                if(closeSuccess){
                    setStatus(CLOSED);
                } else {                                
                    setShowModalError(true);
                }
                setUserValidateClose(false);
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
            setIsShuffling(false);
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
            setIsDecrypting(false);
        }
        setPostError(null);
    } 

    const getAction = () => {

        switch (status){     
            case OPEN: 
                return <span><button id='close-button' className='election-btn' onClick={handleClose}>{Translations[context].close}</button>
                    <button className='election-btn' onClick={handleCancel}>{Translations[context].cancel}</button></span> 
            case CLOSED: 
                return <span>
                    {isShuffling? (<p className='loading'>{Translations[context].shuffleOnGoing}</p>)
                        :(<span>
                            <button className='election-btn' onClick={handleShuffle}>{Translations[context].shuffle}</button>
                        </span>)}                  
                </span>; 
            case SHUFFLED_BALLOT: 
                return <span>
                     {isDecrypting? (<p className='loading'>{Translations[context].decryptOnGoing}</p>)
                        :(<span>
                            <button className='election-btn' onClick={handleDecrypt}>{Translations[context].decrypt}</button>
                        </span>)}
                </span>;
            case RESULT_AVAILABLE: 
                return <span>
                    <Link className='election-link' to={{pathname:`/elections/${electionID}`,
                    data: electionID}}><button className='election-btn'>{Translations[context].seeResult}</button></Link>
                </span>;               
            case CANCELED: 
                return <span> ---
                </span>;  
            default :
                return <span> --- </span>
        }
    }
    return {getAction, modalClose, modalCancel};
}

export default Action;