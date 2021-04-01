import useChangeStatus from './election-status/useChangeStatus';
import {React,useState} from 'react';


const AboutSuccess = (stat) => {
    const {getStatus} =  useChangeStatus(stat.stat);

    return (
        <div>
           {getStatus()}          
        </div>
    )
}

export default AboutSuccess;