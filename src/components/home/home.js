import React, { useState, useEffect, createRef } from 'react'
import './home.css'
import Board from '../board/board'
import mario from './assets/mario.png'
import luigi from './assets/luigi.png'
import toad from './assets/toad.png'
import { Button } from 'react-bootstrap'
import useSound from 'use-sound';
import welcomeSound from './assets/welcome.wav';

function Home() {
    const [player, setPlayer] = useState(null)
    const [redirect, setRedirect] = useState(null)
    const [playersRefs, setPlayersRefs] = useState([]);
    const players = [mario, luigi, toad]
    const [play] = useSound(welcomeSound);

    function choosePlayer(player, i) {
        play()
        setPlayer(player)
        playersRefs.map(item => item.current.style = 'border: 3px solid blue;')
        playersRefs[i].current.style = 'border: 10px solid blue;'
    }

    useEffect(() => {
        setPlayersRefs(playerRefs => (
            Array(players.length).fill().map((_, i) => playerRefs[i] || createRef())
        ));
    }, [players.length]);

    return (
        redirect ? <Board player={player}></Board> :
            <div id="home">
                <br />
                <h1 id="welcome">welcome to the game!</h1>
                <h1>please choose player:</h1>
                {players.map((item, i) => <img key={i} className="playerImg" src={item} alt='player' ref={playersRefs[i]} onClick={() => choosePlayer(item, i)} />)}
                <br />
                <Button className="btn btn-danger" onClick={() => setRedirect(true)}>next</Button>
            </div>
    )
}

export default Home