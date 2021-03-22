import React from 'react';

import './App.css';
import CreateElection from './components/CreateElection';
import Election from './components/Election';
import NavBar from './components/NavBar';
import About from './components/About';
import Footer from './components/Footer';
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
          <Route path="/about" component={About}/>
        </Switch>
        <Footer/>
    </div>

  </Router>
  );
}

const Home = () => (
  <div classeName='home'>
    <h1>Home Page</h1>
  </div>
);

export default App;
