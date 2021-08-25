import React, { useEffect, useState, useRef } from 'react'
import Keyframes from '@keyframes/core';
import Slot from '../slot/slot';
import SideMenu from '../sideMenu/sideMenu'
import './board.css'
import mario from './assets/mario.png';
import { animateScroll as scroll } from 'react-scroll'
import GameOverModal from '../modals/gameOver'
import useSound from 'use-sound';
import enterSound from './assets/enter.wav';

const axios = require('axios');


function Board(props) {
    const [number, setNumber] = useState(null);
    const [title, setTitle] = useState('');
    const [massage, setMassage] = useState('');
    const [showGameOverModal, setShowGameOverModal] = useState(false);
    const [isScrollMap, setIsScrollMap] = useState(false);
    const [isDiceDisabled, setIsDiceDisabled] = useState(false);

    const [play] = useSound(enterSound);
    let { player } = props
    player = player ? player : mario
    const playerImg = useRef(null);
    const slotsMessages = ["האם תוכל לעבור את השודד", "האם יש בחבית רום או חומץ?", "אממ... נראה מפחיד", "האם תצליח להגיע לאוצר?", "הודעה בבקבוק! איזה מתח...", "הגעת לאי? ניצלת!"]
    const slots = [];
    for (let index = 1; index <= 6; index++) {
        slots.push(<Slot key={index} slotIndex={index} setNumber={setNumber} message={slotsMessages[index - 1]} ></Slot>);
    }



    useEffect(() => {
        async function showTheMessage() {
            if (number) {
                playerImg.current.classList.add(`moveTo${number}`);
                saveAction(`Player Rolled ${number}`)
                if (number > 4)
                    scroll.scrollToBottom()

                switch (number) {
                    case 1:
                        setMassage("נשארת באותו המקום")
                        setTitle("Game Over")
                        break;
                    case 2:
                        const isSpoiledRum = Math.random() < 0.5;
                        if (isSpoiledRum) {
                            setMassage("נתקלת ברום מקולקל")
                            setTitle("Game Over")
                        }
                        else {
                            setMassage("הרום אינו מקולקל")
                            setTitle("You Win")
                        }
                        break;
                    case 3:
                        setMassage("הדרקון אכל אותך")
                        setTitle("Game Over")

                        break;
                    case 4:
                        setMassage("מצאת אוצר")
                        setTitle("You Win")
                        break;
                    case 5:
                        await axios.get('http://localhost:3000/api/randomMessage').then((response) => {
                            setTitle("טיפ");
                            setMassage(response.data.message)
                        }).catch((error) => { alert("sorry, something went wrong, please try again later") })
                        break;
                    case 6:
                        setMassage("הגעת לאי")
                        setTitle("You Win")
                        break;
                    default:
                        return;
                }
                setTimeout(() => {
                    play()
                }, 3000);
                setTimeout(() => {
                    setShowGameOverModal(true)

                }, 5000);
            }
        }
        showTheMessage()
    }, [number])
    useEffect(() => {
        if (massage) {
            saveAction(massage)
        }
        if (title) {
            saveAction(title)
        }

    }, [massage, title])

    function removeClass() {
        playerImg.current.classList.remove(`moveTo${number}`);
    }

    function saveAction(action) {
        const body = {
            action: action,
            timeStamp: Date.now()
        }
        axios.post('http://localhost:3000/api/', body)
            .catch(() => {
                alert("sorry, something went wrong, please try again later")
            })

    }

    return (

        <main id="board" className="allScreen">
            <GameOverModal massage={massage} title={title} setMassage={setMassage} setTitle={setTitle} show={showGameOverModal} setShow={setShowGameOverModal} removeClass={removeClass} setIsDiceDisabled={setIsDiceDisabled}></GameOverModal>
            <SideMenu setNumber={setNumber} isScrollMap={isScrollMap} setIsScrollMap={setIsScrollMap} isDiceDisabled={isDiceDisabled} setIsDiceDisabled={setIsDiceDisabled} />
            {slots}
            <img className="imgMario" ref={playerImg} id="imgMario" src={player} alt='player' />

        </main >

    )
}

export default Board
