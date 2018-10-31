import React from 'react'
import Scrollspy from 'react-scrollspy'
import Scroll from './Scroll'

const NavAccount = (props) => (
    <nav id="nav" className={props.sticky ? 'alt' : ''}>
        <Scrollspy items={ ['intro', 'first', 'second', 'cta'] } currentClassName="is-active" offset={-300}>
            <li>
                <Scroll type="id" element="intro">
                    <a href="#">Profilo</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="first">
                    <a href="#">Privacy</a>
                </Scroll>
            </li>
            <li>
                <Scroll type="id" element="second">
                    <a href="#">Password</a>
                </Scroll>
            </li>
        </Scrollspy>
    </nav>
)

export default NavAccount
