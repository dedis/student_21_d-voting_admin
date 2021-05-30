import React, {useState, useContext} from 'react';
import useChangeStatus from '../utils/useChangeStatus';
import './Status.css';
import Modal from '../modal/Modal';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';

/*StatusSuccess is a class that acts as a container for the status of an election
it also contains the two modals for closing and cancelling an election*/
const Status = (props) => {
    const [textModalError, setTextModalError] = useState(null);
    const [context, ] = useContext(LanguageContext);
    const [showModalError, setShowModalError] = useState(false);
    const {getStatus, modalClose, modalCancel} = useChangeStatus(props.status, props.electionID, props.candidates, props.setStatus, props.setResultAvailable, setTextModalError, setShowModalError);
    
    return (
        <div className='status-container'>
            {modalClose}
            {modalCancel}
            
            {getStatus()}
            {<Modal showModal={showModalError} setShowModal={setShowModalError} textModal = {textModalError} buttonRight={Translations[context].close} />}
        </div>
    )
}

export default Status;