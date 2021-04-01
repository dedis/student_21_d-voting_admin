import React from 'react';

import './App.css';
import CreateElection from './components/election-creation/CreateElection';
import Election from './components/election-status/Election';
import NavBar from './components/navigation/NavBar';
import Home from './components/homepage/Home';
import CastBallot from './components/voting/CastBallot';
import About from './components/About';
import Footer from './components/footer/Footer';
import useFetchData from './components/useFetchData';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import ElectionDetails from './components/election-status/ElectionDetails';

function App() {

  
  return (
    <Router>
    <div className="App">
        <div className='content'>
          <Route path='/:page' component={NavBar} />
          <Route exact path='/' component={NavBar}/>
          <Switch>
            <Route path="/" exact component={Home}/>
            <Route path="/create-election" component={CreateElection}/>
            <Route path="/elections" exact component={Election}/>
            <Route path="/elections/:id" component={ElectionDetails}/>
            <Route path="/vote" component={CastBallot}/>
            <Route path="/about" component={About}/>
          </Switch>
        </div>
        <div className='footer-container'>
          <Footer/>
        </div>
    </div>

  </Router>
  );
}



export default App;
