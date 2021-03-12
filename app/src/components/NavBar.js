import React from 'react';
import '../App.css';

import {Link} from 'react-router-dom';


function NavBar() {
    const navStyle = {
        color: 'black'
    };
  return (
    
    <nav className = "nav-wrapper red darken-3">
        <ul className = "nav-links">
        <Link style={navStyle} to='/'>
                <li>Home</li>
            </Link>
            <Link style={navStyle} to='/create-election'>
                <li>Create an election</li>
            </Link>
            <Link style={navStyle} to='/elections'>
                <li>Election status</li>
            </Link>
            <Link style={navStyle} to='/about'>
                <li>About</li>
            </Link>
            
        </ul>
    </nav>

  );
}


export default NavBar;
