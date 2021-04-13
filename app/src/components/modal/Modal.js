
import {React} from 'react';

import './Modal.css';

function Modal({showModal, setShowModal}){
    
    const closeModal = () => {
        setShowModal(!showModal);
    }

    return (
        <div>
        {showModal? (
            <div className='modal-background'>
                <div className='modal-wrapper'>
                    Modal window
                    <button className='close-btn' onClick={closeModal}>Close</button>
                </div>
            </div>)
        
        :null}
        </div>
    );

}

export default Modal;