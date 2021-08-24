import React, { useState } from 'react'
import './slot.css'
import { Toast } from 'react-bootstrap'
function Slot(props) {
    const { slotIndex, message } = props
    const [isShowToast, setIsShowToast] = useState(false);

    const toggleShowToast = () => setIsShowToast(!isShowToast);

    return (
        <span id="slot" onClick={toggleShowToast}>
            <img className={`slot${slotIndex}Position`} src={`/slot${slotIndex}.png`} alt='slot' />
            <Toast onClose={toggleShowToast} show={isShowToast} className={`slot${slotIndex}Position`} delay={2000} autohide>
                <Toast.Header>
                </Toast.Header>
                <Toast.Body >{message}</Toast.Body>
            </Toast>
        </span>
    )
}

export default Slot
