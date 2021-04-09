
import {React,useContext} from 'react';

import './About.css';
import {Translations} from './language/Translations';
import {LanguageContext} from './language/LanguageContext';


function About() {
 const [context, setContext] = useContext(LanguageContext)
  
  return(
    <div className='about-container'>
      <div className='about-text'>
        {/*Translations[context].about*/}
        This website hosts the interface of an evoting system. This system runs smart contracts, handled by a set of Byzantine fault-tolerant nodes.
        When an administrator creates an election, the election parameters are saved on a blockchain and so are every following transaction (closing/cancelling election, casting a vote,...). 
        A distributed key is generated at election creation time so that when a user votes, his/her vote is encrypted with the key guarantying the anonymity of the vote. However the system doesn't enforce the anonymity of the voter. 
        When an election is closed, the nodes shuffle the ballots and check its correctness before decrypting the shuffle and publish the result of the election on a smart contract.
      </div> 
      
        
 
    </div>
    );


  }
 
export default About;
