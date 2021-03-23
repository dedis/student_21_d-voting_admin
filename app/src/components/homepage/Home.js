import React from 'react';
import '../../App.css';



const Home = () => (
    <div classeName='home'>
      <h1>Welcome to the e-voting platform!</h1>
      <div className='home-text'>
      You can connect as an admin or as a voter by clicking on one of the buttons below
      </div>
      <div className='home-left'>
        <button className='signin-admin-btn'>Administrator</button>
      </div>
      <div className='home-left'>
        <button className='signin-voter-btn'>Voter</button>
      </div>
    </div>
  );

export default Home;