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
        fontWeight: "bold",
    };

  return ( 
    <div className='nav-links'>
        <ul>
            <NavLink exact to='/'>
                <li className='nav-logo'>
                    <img src={logo} alt='small logo'></img>
                </li>
            </NavLink>
            
            <NavLink className='nodeco' exact to='/'  activeStyle={activeStyle}>
                <li>{Translations[lanContext].navBarHome}</li>
            </NavLink>
            <NavLink className='nodeco' to='/create-election'   activeStyle={activeStyle}>
                <li>{Translations[lanContext].navBarCreate}</li>
            </NavLink>
            <NavLink className='nodeco' to='/elections'  activeStyle={activeStyle}>
                <li>{Translations[lanContext].navBarStatus}</li>
            </NavLink>
            <NavLink className='nodeco' to='/vote'  activeStyle={activeStyle}>
                <li>{Translations[lanContext].navBarVote}</li>
            </NavLink>
            <NavLink className='nodeco' to='/about'  activeStyle={activeStyle}>
                <li>{Translations[lanContext].navBarAbout}</li>
            </NavLink>
                      
            <li className='last'>
            <select value={lanContext} onChange={(e)=>setLanContext(e.target.value)}>
                    <option value='en'>en</option>
                    <option value='fr'>fr</option>
                </select>
            </li>           
        </ul>
    </div>
  );
}


export default NavBar;
