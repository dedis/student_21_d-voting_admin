import React, {useEffect,useState} from 'react';

import '../App.css';

function Election() {
    useEffect(()=> {
        fetchItems();
    }, []);
    const [electionName, setName] = useState([]);
    const fetchItems = async() => {
        const response = await fetch('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1');
        
        const items = await response.json();
        setName(items.name);
    }  
  return (
    <div>
      <h1>Election status</h1>
      
          <div>{electionName}</div>
          <div className='elec'> <ElectionInfoCard></ElectionInfoCard></div>

    </div>
  );
}

class ElectionInfoCard extends React.Component{
    render(){
        return (
            <div>hello</div>
            
        )
    }
}

export default Election;

/* https://60475e95b801a40017ccbff6.mockapi.io/api/election */

