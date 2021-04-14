
import {React} from 'react';

import './Modal.css';

function Modal({showModal, setShowModal, textModal, buttonLeft, buttonRight}){
    
    const closeModal = () => {
        setShowModal(!showModal);
    }

    const displayButtons = () => {
        return (
            <div >
                {buttonLeft!==null?(<button className='btn-left'>{buttonLeft}</button>):null}
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