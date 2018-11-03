import React from 'react'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

const NavIndex = (props) => (
    <nav id="nav" className={props.sticky ? 'alt' : ''}>
        <Scrollspy items={ ['intro', 'first', 'second', 'cta'] } currentClassName="is-active" offset={-300}>
            <li>
                <Scroll type="id" element="intro">
                    <a href="#">Introduzione</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="first">
                    <a href="#">Accedi</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="second">
                    <a href="#">Registrati</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="team">
                    <a href="#">Team</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="cta">
                    <a href="#">Contattaci</a>
                </Scroll>
            </li>
        </Scrollspy>
    </nav>
)

export default NavIndex
