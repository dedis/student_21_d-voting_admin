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
    const [noOpenElections, setNoOpenElections] = useState(true);

    const token = sessionStorage.getItem('token');
    const fetchRequest = {
        method: 'POST',
        body: JSON.stringify({'Token': token})
    }
    const getAllElectionsEndpoint = "/evoting/all";
    const [data, loading, error] = useFetchCall(getAllElectionsEndpoint, fetchRequest);

    const displayBallot = (election) =>{   
            return <div className='cast-ballot-card'>
                        <Ballot electionData={election} setShowModal={setShowModal}></Ballot>
                    </div>
    }
    
   
    const showBallots = (elections) => {
        return (
            <div>
                {noOpenElections? <p>{Translations[context].noVote}</p> : <div className='ballot-indication'>{Translations[context].voteAllowed}</div>}
                <Modal showModal={showModal} setShowModal={setShowModal} textModal = {Translations[context].voteSuccess} buttonRight={Translations[context].close} />
                {elections.map((elec) => {
                    if(elec.Status === 1){
                        setNoOpenElections(false);
                        return <div className='ballot'>{displayBallot(elec)}</div>;
                    }
                })}

            </div>
        )}

    return (
        <div className = 'cast-ballot'>
            {!loading && data.AllElectionsInfo.length > 0?  showBallots(data.AllElectionsInfo) : <p></p>}       
        </div>
    )
}

export default BallotsGrid;