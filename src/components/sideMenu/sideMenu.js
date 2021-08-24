import React, { useRef } from 'react'
import ScrollMap from '../scrollMap/scrollMap'
import Cube from '../cube/cube'
import './sideMenu.css'
import menuImg from './assets/menu.png'
function SideMenu(props) {
    const menuRef = useRef(null)
    const asideRef = useRef(null)
    let isShowMenu = true;
    function hideMenu() {
        isShowMenu = !isShowMenu;
        if (isShowMenu) {
            menuRef.current.style.display = 'block'
            asideRef.current.classList.add('largeMenu')
            asideRef.current.classList.remove('smallMenu')
        } else {
            menuRef.current.style.display = 'none'
            asideRef.current.classList.add('smallMenu')
            asideRef.current.classList.remove('largeMenu')

        }
    }
    return (
        <aside ref={asideRef}>
            <img onClick={hideMenu} id="menuImg" src={menuImg} alt='menu' />
            <div ref={menuRef} id="sideMenu" >
                <ScrollMap {...props} />
                <Cube {...props} />
            </div>
        </aside>
    )
}

export default SideMenu
