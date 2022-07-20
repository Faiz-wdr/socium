import React from 'react'
import './navbar.css'
function NavBar() {
    return (
        <nav className='nav_bar' >
            <h2>Socium</h2>

            <ul>
                <li>Home</li>
                <li>About</li>
                <li
                    style={{ cursor: 'pointer' }}
                    onClick={() => window.location.href = 'https://olivine-planet-59a.notion.site/Learning-Resources-44e6636df76a4fa08439af67176aec00'}

                >Resources</li>
            </ul>

        </nav>
    )
}

export default NavBar