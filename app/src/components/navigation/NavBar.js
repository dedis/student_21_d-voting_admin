import {React, useContext} from 'react';
import '../../App.css';
import './NavBar.css';
import logo from '../../assets/logoWithoutText.png';
import {LanguageContext} from '../language/LanguageContext';
import {Translations} from '../language/Translations';


import {NavLink} from 'react-router-dom';



function NavBar() {

    const [lanContext, setLanContext] = useContext(LanguageContext);
    const activeStyle = {
        fontWeight: "bold"
    };

  return (
    
    <nav className = "nav-wrapper">
       
        
        <span className = "nav-container">
        
            <ul className = "nav-links">
            
                <NavLink  exact to='/' className='nav_link'  activeStyle={activeStyle}>
                    <li>{Translations[lanContext].navBarHome}</li>
                </NavLink>
                <NavLink to='/create-election' className='nav_link'   activeStyle={activeStyle}>
                    <li>{Translations[lanContext].navBarCreate}</li>
                </NavLink>
                <NavLink to='/elections' className='nav_link'  activeStyle={activeStyle}>
                    <li>{Translations[lanContext].navBarStatus}</li>
                </NavLink>
                <NavLink to='/vote' className='nav-link' activeStyle={activeStyle}>
                    <li>{Translations[lanContext].navBarVote}</li>
                </NavLink>
                <NavLink to='/about' className='nav_link'  activeStyle={activeStyle}>
                    <li>{Translations[lanContext].navBarAbout}</li>
                </NavLink>
                <li>
                    <select value={lanContext} onChange={(e)=>setLanContext(e.target.value)}>
                        <option value='en'>en</option>
                        <option value='fr'>fr</option>
                    </select>
                </li>
                <li>
                    <img src={logo}></img>
                </li>
                
            </ul>
        </span>
        

        
    </nav>

  );
}


export default NavBar;
