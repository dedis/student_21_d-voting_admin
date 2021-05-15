import {useState, useEffect} from 'react';

function useFetchCall(endpoint, request){

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

   useEffect(() => {

        const fetchData = async () =>{
            try{
                const response = await fetch(endpoint,request);
    
                if(!response.ok){
                    throw Error(response.statusText);
                } else {
                    let dataReceived = await response.json();
                    setData(dataReceived);
                    setLoading(false);
                }
            } catch(error){
                setError(error);
                console.log(error);
            }
        }
        fetchData();
        
    }, [])

    return [data, loading, error]
}

export default useFetchCall;