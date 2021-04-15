import {React} from 'react';

function ConfirmModal({showModal, setShowModal, textModal, setUserValidate}){

    const closeModal = () => {
        setShowModal(prev=>!prev);
    }

    const validateChoice = () => {
        setUserValidate(true);
        closeModal();
    }

    const displayButtons = () => {
        return (
            <div >
                <button className='btn-left' onClick={closeModal}>No</button>
                <button className='btn-right' onClick={validateChoice}>Yes</button>
                
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

export default ConfirmModal;