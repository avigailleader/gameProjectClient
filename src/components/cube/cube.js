import React from 'react'
import Dice from 'react-dice-roll';
import useSound from 'use-sound';
import rollDiceSound from './assets/rollDice.wav';

import './cube.css'
function Cube(props) {
    const { setNumber, isDiceDisabled, setIsDiceDisabled } = props;
    const [play] = useSound(rollDiceSound);

    function rollDice(value) {
        setIsDiceDisabled(true);
        console.log("move to " + value)
        setNumber(value)
    }

    return (
        <div >
            <button id="btnRollDice" >Roll dice&#9759;</button>
            <br />
            <span disabled={isDiceDisabled} onClick={play} ><Dice disabled={isDiceDisabled} id="dice" defaultValue="3" size="150" onRoll={(value) => rollDice(value)} /></span>

        </div>
    )
}

export default Cube

