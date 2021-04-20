
import {useState, useEffect, useRef} from 'react';


/*custom hook to fetch data from the skipchain */
const useFetchData = (url, isJson=true) => {
    const cache = useRef({})
    const [loading, setLoading] = useState(true);
    const [electionRetrieved, setElectionRetrieved] = useState(false);
    const [electionData, setElectionData]= useState([]);

    /* https://stackoverflow.com/questions/34309988/byte-array-to-hex-string-conversion-in-javascript */
    const toHexString = (byteArray) =>{
        return Array.from(byteArray, function(byte) {
          return ('0'+(byte).toString(16)).slice(-2);
        }).join('')
      }

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
                        console.log(new Uint8Array(data));
                        const view =  toHexString(new Uint8Array(data));

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