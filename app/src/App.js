import React from 'react';

import './App.css';
import CreateElection from './components/CreateElection';
import Election from './components/Election';
import NavBar from './components/NavBar';
import About from './components/About';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/create-election" component={CreateElection}/>
          <Route path="/elections" component={Election}/>
          <Route path="/about" component={About}/>
        </Switch>
    </div>
  </Router>
  );
}

const Home = () => (
  <div>
    <h1>Home Page</h1>
  </div>
);

export default App;
