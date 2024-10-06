import React from 'react'
import logo from '../img/music-icon.png'

export default function Header() {
    return (
        <header>
            <img src={logo} alt="Logo" />
            <h1>Spotifier</h1>
        </header>
    )
}
