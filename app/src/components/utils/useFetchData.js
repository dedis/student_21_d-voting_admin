
import {useState, useEffect, useRef} from 'react';


/*custom hook to fetch data from the skipchain */
//Remark : currently the cache doesn't work, will see if time to do it
const useFetchData = (url, isJson=true) => {
    const cache = useRef({})
    const [loading, setLoading] = useState(true);
    const [electionRetrieved, setElectionRetrieved] = useState(false);
    const [electionData, setElectionData]= useState([]);

    useEffect(()=>{
        if (!url) return;
        const fetchItems = async() => {
            setLoading(true);

            if(cache.current[url]){
                const data = cache.current[url];
                setElectionData(data);
                setLoading(false)
            } else {
                
                const response = await fetch(url);
                /*TODO: define a status with backend to mean that no election exists  */
                if(!response.ok){
                    setLoading(false);
                    setElectionRetrieved(false);
                    
                } else {

                    if(isJson){
                        let data = await response.json();
                        /*cache.current[url] = data;*/
                        setElectionData(data);
                    } else {
                        let data = await response.arrayBuffer();
                        setElectionData(new Uint8Array(data));
                        
                    }
                setLoading(false);
                setElectionRetrieved(true);
                }
            }
        };

        fetchItems()

    },[url]);
    return [loading, electionRetrieved, electionData];
};

export default useFetchData;



//inspired from : https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/