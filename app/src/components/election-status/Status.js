import React, {useState, useContext} from 'react';
import useChangeStatus from '../utils/useChangeStatus';
import './Status.css';
import Modal from '../modal/Modal';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import PropTypes from 'prop-types';

/*StatusSuccess is a class that acts as a container for the status of an election
it also contains the two modals for closing and cancelling an election*/
const Status = ({status, electionID, candidates, setStatus, setResultAvailable}) => {
    const [textModalError, setTextModalError] = useState(null);
    const [context, ] = useContext(LanguageContext);
    const [showModalError, setShowModalError] = useState(false);
    const {getStatus, modalClose, modalCancel} = useChangeStatus(status, electionID, candidates, setStatus, setResultAvailable, setTextModalError, setShowModalError);
    
    return (
        <div className='status-container'>
            {modalClose}
            {modalCancel}
            
            {getStatus()}
            {<Modal showModal={showModalError} setShowModal={setShowModalError} textModal = {textModalError} buttonRight={Translations[context].close} />}
        </div>
    )
}

Status.propTypes = {
    status : PropTypes.number.isRequired,
    electionID : PropTypes.string.isRequired,
    candidates : PropTypes.array.isRequired,
    setStatus : PropTypes.func.isRequired,
    setResultAvailable : PropTypes.func,
}

export default Status;