import { setNestedObjectValues } from 'formik';
import {React, useState, useEffect, useRef} from 'react';


/*custom hook to fetch data from the skipchain */
const useFetchData = (url) => {
    const cache = useRef({})
    const [loading, setLoading] = useState(true);
    const [electionRetrieved, setElectionRetrieved] = useState(false);
    const [data, setData]= useState([]);

    useEffect(()=>{
        if (!url) return;
        const fetchItems = async() => {
            setLoading(true);
            if(cache.current[url]){
                console.log("cache");
                const data = cache.current[url];
                setData(data);
                setLoading(false)
            } else {
                const response = await fetch(url);
                console.log("fetch");
                /*TODO: define a status with backend to mean that no election exists  */
                if(!response.ok){
                    setLoading(false);
                    setElectionRetrieved(false);
                    
                } else {
                const data = await response.json();
                cache.current[url] = data;
                setData(data);
                setLoading(false);
                setElectionRetrieved(true);
                }
            }
        };

        fetchItems()
        console.log(data);
    },[url]);
    return {loading, electionRetrieved, data};
};

export default useFetchData;



//inspired from : https://www.smashingmagazine.com/2020/07/custom-react-hook-fetch-cache-data/