import React from 'react';

import './App.css';
import CreateElection from './components/election-creation/CreateElection';
import Election from './components/election-status/Election';
import NavBar from './components/navigation/NavBar';
import Home from './components/homepage/Home';
import CastBallot from './components/voting/CastBallot';
import About from './components/About';
import Footer from './components/footer/Footer';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <Route path='/:page' component={NavBar} />
        <Route exact path='/' component={NavBar}/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/create-election" component={CreateElection}/>
          <Route path="/elections" component={Election}/>
          <Route path="/vote" component={CastBallot}/>
          <Route path="/about" component={About}/>
        </Switch>
        <Footer/>
    </div>

  </Router>
  );
}



export default App;
