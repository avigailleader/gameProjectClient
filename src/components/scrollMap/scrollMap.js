import React, { useState, useEffect } from 'react'
import './scrollMap.css'
import handImg from './assets/hand.png'
import { animateScroll as scroll } from 'react-scroll'

function ScrollMap(props) {
    const { isScrollMap, setIsScrollMap } = props;
    const [left, setLeft] = useState(0);
    let isDown = false;
    let startX;
    let scrollLeft;
    const slider = document.body;
    useEffect(() => {
        if (isScrollMap) {
            slider.style = 'cursor: grab;';
            slider.addEventListener('mousedown', mousedownHandler);
            slider.addEventListener('mouseleave', mouseleaveAndUpHandler);
            slider.addEventListener('mouseup', mouseleaveAndUpHandler);
            slider.addEventListener('mousemove', mousemoveHandler);
        }
        else {
            slider.style = 'cursor: default;';
            slider.removeEventListener('mousedown', mousedownHandler, true);
            slider.removeEventListener('mouseleave', mouseleaveAndUpHandler, true);
            slider.removeEventListener('mouseup', mouseleaveAndUpHandler, true);
            slider.removeEventListener('mousemove', mousemoveHandler, true);

        }
    }, [isScrollMap])

    useEffect(() => {
        if (left) {
            scroll.scrollTo(left);
        }
    }, [left])
    function mousedownHandler(e) {
        isDown = true;
        slider.style = 'cursor: grabbing;';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }
    function mouseleaveAndUpHandler() {
        isDown = false;
        slider.style = 'cursor: grab;';
    }
    function mousemoveHandler(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 10; //scroll-fast
        setLeft(scrollLeft - walk)
    }
    return (
        <div id="scrollMap" onClick={() => { setIsScrollMap(!isScrollMap); debugger }}>
            <img id="handImg" src={handImg} alt="hand" />
            <div id="browseMap">Browse map</div>
        </div>
    )
}

export default ScrollMap
