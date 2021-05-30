
import {useState, useEffect} from 'react';


const useFetchKey = (endpoint) => {
    const [key, setKey] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    const toHexString = (byteArray) => {
        return Array.from(byteArray, function(byte) {
          return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('')
    }

    useEffect(async() => {
        try{
            const response = await fetch(endpoint);
            
            if(!response.ok){
                throw Error(response.statusText);
            } else {
                console.log(response);
                let keyReceived = await response.arrayBuffer();
                console.log(keyReceived);
                setKey(new Uint8Array(keyReceived));
                //setKey(keyReceived);
                setLoading(false);
            }
        } catch(error){
            setError(error);
            console.log(error);
        }      
    }, [])

    return [key, loading, error]
}

export default useFetchKey;