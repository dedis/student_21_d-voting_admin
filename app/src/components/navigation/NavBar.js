import React from 'react';
import '../../App.css';
import './NavBar.css';

import {NavLink} from 'react-router-dom';


function NavBar() {
    const activeStyle = {
        fontWeight: "bold"
    };
  return (
    
    <nav className = "nav-wrapper">
        <div className = "nav-container">
            <ul className = "nav-links">
                <NavLink  exact to='/' className='nav_link'  activeStyle={activeStyle}>
                    <li>Home</li>
                </NavLink>
                <NavLink to='/create-election' className='nav_link'   activeStyle={activeStyle}>
                    <li>Create an election</li>
                </NavLink>
                <NavLink to='/elections' className='nav_link'  activeStyle={activeStyle}>
                    <li>Election status</li>
                </NavLink>
                <NavLink to='/vote' className='nav-link' activeStyle={activeStyle}>
                    <li>Cast a vote</li>
                </NavLink>
                <NavLink to='/about' className='nav_link'  activeStyle={activeStyle}>
                    <li>About</li>
                </NavLink>
                
            </ul>
        </div>
    </nav>

  );
}


export default NavBar;
