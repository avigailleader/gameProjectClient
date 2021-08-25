import React, { useRef } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { animateScroll as scroll } from 'react-scroll'
import gameOverImg from './assets/game-over.gif'
import youWinImg from './assets/you-win.gif'
import massageInBottleImg from './assets/massage-in-bottle.gif'
import './gameOver.css'
const GameOverModal = (props) => {
    const modalRef = useRef(null)
    const { massage, title, setMassage, setTitle, show, setShow, removeClass, setIsDiceDisabled } = props;

    const img = title === "Game Over" ? gameOverImg : title === "You Win" ? youWinImg : massageInBottleImg

    const style = {
        backgroundImage: `url(${img})`,
    };

    function quit() {
        window.location.reload();
    }

    function tryAgain() {
        setShow(false)
        setMassage('')
        setTitle('')
        scroll.scrollToTop()
        removeClass()
        debugger
        setIsDiceDisabled(false)
    }
    return (
        <>
            <Modal size="lg" show={show} onHide={tryAgain}>
                <Modal.Header closeButton>
                    <Modal.Title id="modalTitle">{title === "טיפ" ? "טיפ" : ''}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={style} id="modal" ref={modalRef}>{massage}<br />
                    <h1 id="youWin">{title === "You Win" ? "You Win" : ''}</h1>
                </Modal.Body>
                <Modal.Footer id="modalFooter">
                    <Button variant="secondary" onClick={quit}>
                        Quit
                    </Button>
                    <Button variant="primary" onClick={tryAgain}>
                        Try Again
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default GameOverModal
