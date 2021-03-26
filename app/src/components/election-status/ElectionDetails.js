import React, {useEffect,useState} from 'react';


import './ElectionDetails.css';


function ElectionDetails(props) {

    /*The data related to the election params is in props.location.data */

    
    return (
        <div>
        <h1>Election details</h1>
        {console.log(props.location.data)}
        </div>

    );

}

export default ElectionDetails;