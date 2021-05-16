import {React, useState, useContext, useEffect} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';
import usePostCall from '../utils/usePostCall';

/*Custom hook that can display the status of an election and enable changes of status (closing, cancelling,...)*/ 
const useChangeStatus = (status, electionID, candidates, setStatus, setResultAvailable=null) =>{

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
    const {postData} = usePostCall();
    
    
    const simplePostRequest = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
    }
    const closeElectionEndpoint = "/evoting/close";
    const cancelElectionEndpoint = "/evoting/cancel";
    const decryptBallotsEndpoint = "/evoting/decrypt";
    const shuffleBallotsEndpoint = "/evoting/shuffle";
   
   

    const address1 = 'RjEyNy4wLjAuMToyMDAx'; //address of a collective authority member
    const PK1 = 'SL7hPJNRMMg3/y/R841mEZ9qTEyZyCYGCJETekKNicY=';
    const address2 = 'RjEyNy4wLjAuMToyMDAy';
    const PK2 = '0NHeGTYbqyLbZPEAKpdxhkpyn3HufrJ8PSbBVN1h0vc=';
    const address3 = 'RjEyNy4wLjAuMToyMDAz';
    const PK3 = '4u6e5gRizxTk1c8OqfKV8Cx41cqt43iJqNZXCETSsrs=';
    const CollectiveAuthorityMembers = [{'Address' : address1,'PublicKey':PK1}, {'Address' : address2,'PublicKey':PK2}, {'Address' : address3,'PublicKey':PK3}];
    const shuffleRequest = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token, 'Members': CollectiveAuthorityMembers})
    }

    useEffect(() => {        
            //check if close button was clicked and the user validated the confirmation window
            if(isClosing && userValidateClose){
                const closeSuccess = postData(closeElectionEndpoint, simplePostRequest, setIsClosing);            
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
            const cancelSuccess = postData(cancelElectionEndpoint, simplePostRequest, setIsCanceling);
            if(cancelSuccess){
                setStatus(6);
            } else {

            }
            setUserValidateCancel(false);           
        }; 
    }, [isCanceling, showModalCancel])


    const handleClose = () =>{     
        setShowModalClose(true);
        setIsClosing(true);       
    }

    const handleCancel = () =>{
        setShowModalCancel(true);      
        setIsCanceling(true); 
    }

    const handleShuffle = () => {
        setIsShuffling(true);
        const shuffleSuccess = postData(shuffleBallotsEndpoint,shuffleRequest,setIsShuffling);
        if(shuffleSuccess){
            setStatus(3);
        }
    }

    const handleDecrypt = async() => {
        const decryptSucess = await postData(decryptBallotsEndpoint, simplePostRequest, setIsDecrypting);
        if(decryptSucess){
            if(setResultAvailable !== null){
                setResultAvailable(true);
            }        
            setStatus(5);
        }
    }

    const countBallots = (result) => {
        const resultMap = {};
        for(var i = 0; i< candidates.length;i++){
            resultMap[candidates[i]] = 0;
        }
        for(var i = 0; i< result.length;i++){
           resultMap[result[i]['Vote']]  = resultMap[result[i]['Vote']] +1;
        }
        console.log(resultMap);
        return Object.entries(resultMap).map(([k, val])=>{
            return <div>{k}:{val}</div>
        })
       
        
    }

    const getStatus = () => {

        switch (status){
            case -1:
                return 'status not retrieved';           
            case 1: //on going
                return <span>
                    <span className='election-status-on'></span>
                    <span className='election-status-text'>{Translations[context].statusOpen}</span>
                    
                    <button id='close-button' className='election-btn' onClick={handleClose}>{Translations[context].close}</button>
                    <button className='election-btn' onClick={handleCancel}>{Translations[context].cancel}</button>
                </span>;  
            case 2: //closed
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>{Translations[context].statusClose}</span>
                    <button className='election-btn' onClick={handleShuffle}>{Translations[context].shuffle}</button>
                </span>; 
            case 3: //ballots have been shuffled
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-status-text'>{Translations[context].statusClose}</span>
                    <button className='election-btn' onClick={handleDecrypt}>{Translations[context].decrypt}</button>
                </span>;
            case 5: //result available
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-btn'>{Translations[context].resultsAvailable }</span>
                </span>;               
            case 6: //election has been canceled
                return <span>
                    <span className='election-status-cancelled'></span>
                    <span className='election-status-text'>{Translations[context].statusCancel}</span>
                </span>;  

            default :
                return 'couldn\'t match status number';
            };
    } 

    return {getStatus, modalClose, modalCancel};
};

export default useChangeStatus;