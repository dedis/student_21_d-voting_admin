import React, {useState, useEffect} from 'react';

import './App.css';
import CreateElection from './components/election-creation/CreateElection';
import Election from './components/election-status/Election';
import NavBar from './components/navigation/NavBar';
import Home from './components/homepage/Home';
import CastBallot from './components/voting/CastBallot';
import About from './components/About';
import Footer from './components/footer/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ElectionDetails from './components/election-status/ElectionDetails';
import {LanguageContext} from './components/language/LanguageContext';
import Login from './components/login/Login';
import useToken from './components/utils/useToken';


function App() {
  
  const getBrowserLanguage = () => {
    var userLang = navigator.userLanguage || navigator.language; 
    if(userLang.substring(0,2) === 'fr'){
      return 'fr'
    }
    return 'en';
  }

  //language state
  const [lanContext, setLanContext] =  useState(getBrowserLanguage());
  
  
  const [token, setToken] = useToken();

  return (
    <div className="App">
      
     <Router>
        <LanguageContext.Provider value={[lanContext, setLanContext]}>         
          <div className='app-nav'>
            <Route path='/:page' component={NavBar} />        
            <Route exact path='/' component={NavBar}/>
          </div>
          <div data-testid="content" className='app-page'>
          {!token? (<div className='login-container'><Login setToken={setToken}/></div>): (<div>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/create-election" component={CreateElection}/>
              <Route path="/elections" exact component={Election}/>
              <Route path="/elections/:id" component={ElectionDetails}/>
              <Route path="/vote" component={CastBallot}/>
              <Route path="/about" component={About}/>
            </Switch>
            </div>)}
          </div>
          <div className='footer-container'>
            <Footer/>
          </div>
        </LanguageContext.Provider>
    </Router>
  </div>
  );
}

export default App;
