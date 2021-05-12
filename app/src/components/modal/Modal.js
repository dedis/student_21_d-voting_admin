
import {React} from 'react';

import './Modal.css';

function Modal({showModal, setShowModal, textModal,  buttonRight}){
    
    const closeModal = () => {
        setShowModal(false);
    }

    const displayButtons = () => {
        return (
            <div >            
                <button className='btn-right' onClick={closeModal}>{buttonRight}</button>              
            </div>
        )
    }

    return (
        <div>
        {showModal? (
            <div className='modal-background'>
                <div className='modal-wrapper'>
                    <div className='text-container'>{textModal}</div>          
                    <div className='buttons-container'>
                    {displayButtons()}
                    </div>
                </div>
            </div>)   
        :null}
        </div>
    );
}

export default Modal;