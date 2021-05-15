import {React, useState, useContext, useEffect} from 'react';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';
import Modal from '../modal/Modal';
import useCloseElection from '../utils/useCloseElection';
import useCancelElection from '../utils/useCancelElection';
import useShuffle from '../utils/useShuffle';
import useDecryptBallots from '../utils/useDecryptBallots';
import useGetResults from '../utils/useGetResults';

/*Custom hook that can display the status of an election and enable changes of status (closing, cancelling,...)*/ 
const useChangeStatus = (stat, electionID, candidates) =>{

    const [status, setStatus] = useState(stat);
    const [context, ] = useContext(LanguageContext);
    const [isClosing, setIsClosing] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    const {closeElection} = useCloseElection(setIsClosing);
    const {cancelElection} = useCancelElection(setIsCanceling);
    const {shuffleElection} = useShuffle(setIsShuffling,setStatus);
    const {decryptBallots} = useDecryptBallots();
    const {getResults} = useGetResults();
    const [result, setResult] = useState(null);
    const [showModalClose, setShowModalClose] = useState(false);
    const [showModalCancel, setShowModalCancel] = useState(false);
    const [showModalResult, setShowModalResult] = useState(false);
    const [userValidateClose, setUserValidateClose] = useState(false);
    const [userValidateCancel, setUserValidateCancel] = useState(false);
    const modalClose =  <ConfirmModal id='close-modal'showModal={showModalClose} setShowModal={setShowModalClose} textModal = {Translations[context].confirmCloseElection} setUserValidate={setUserValidateClose} />;
    const modalCancel =  <ConfirmModal showModal={showModalCancel} setShowModal={setShowModalCancel} textModal = {Translations[context].confirmCancelElection}  setUserValidate={setUserValidateCancel} />;
    const [text, setText] = useState("");
    const modalResult =  <Modal showModal={showModalResult} setShowModal={setShowModalResult} textModal = {text} buttonRight="close" />;
    
    useEffect(() => {  
           
            //check if close button was clicked and the user validated the confirmation window
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
            const cancelSuccess = cancelElection(electionID, sessionStorage.getItem('id'), sessionStorage.getItem('token'));
            if(cancelSuccess){
                setStatus(6);
            } else {

            }
            setUserValidateCancel(false);
            
        }; 
    }, [isCanceling, showModalCancel])

    useEffect(()=> {
        if(result){
           setText(countBallots(result));
           
        }
    }, [result])

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
        shuffleElection(electionID, sessionStorage.getItem('id'), sessionStorage.getItem('token'));
    }

    const handleDecrypt = () => {
        decryptBallots(electionID, sessionStorage.getItem('id'), sessionStorage.getItem('token'), setStatus);
    }

    const handleResult = async() => {
        getResults(electionID, sessionStorage.getItem('token'), setResult);               
        setShowModalResult(true);
        
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
                    <button className='election-btn' onClick={handleDecrypt}>{Translations[context].decrypt}</button>
                </span>;
            case 5: //result available
                return <span>
                    <span className='election-status-closed'></span>
                    <span className='election-btn'>{Translations[context].resultsAvailable}</span>
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

    return {getStatus, modalClose, modalCancel, modalResult};
};

export default useChangeStatus;