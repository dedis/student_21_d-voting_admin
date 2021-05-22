import {React, useState, useEffect, useContext} from 'react';
import Ballot from './Ballot';
import Modal from '../modal/Modal';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import useFetchCall from '../utils/useFetchCall';

import './BallotsGrid.css';

function BallotsGrid(){
    const [context, ] = useContext(LanguageContext);
    const [showModal, setShowModal] = useState(false);
    const [modalText, setModalText] = useState(Translations[context].voteSuccess);
    const [openBallot, setOpenBallot] = useState(false);

    const token = sessionStorage.getItem('token');
    const fetchRequest = {
        method: 'POST',
        body: JSON.stringify({'Token': token})
    }
    const getAllElectionsEndpoint = "/evoting/all";
    const [data, loading, error] = useFetchCall(getAllElectionsEndpoint, fetchRequest);

    const displayBallot = (election) =>{   
            return <div className='cast-ballot-card'>
                        <Ballot electionData={election} setShowModal={setShowModal} setModalText={setModalText}></Ballot>
                    </div>
    }
    
   
    const showBallots = (elections) => {
        return (
            <div>
                <Modal showModal={showModal} setShowModal={setShowModal} textModal = {modalText} buttonRight={Translations[context].close} />
                {elections.map((elec) => {
                    if(elec.Status === 1){
                        if(openBallot === false){
                            setOpenBallot(true);
                        }
                        return <div className='ballot'>{displayBallot(elec)}</div>;
                    }
                })}
                {!openBallot? <div>{Translations[context].noVote}</div> :null}
            </div>
        )}

    return (
        <div className = 'cast-ballot'>
            {openBallot?<div className='ballot-indication'>{Translations[context].voteAllowed}</div>:null}
            {loading? <p className='loading'>{Translations[context].loading}</p>:<p></p>}
            {!loading && data.AllElectionsInfo.length > 0?  showBallots(data.AllElectionsInfo) : <p>{Translations[context].noVote}</p>}       
        </div>
    )
}

export default BallotsGrid;