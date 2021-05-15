import {useEffect, useState} from 'react';

/**
 * 
 * @param {*} endpoint  api endpoint
 * @param {*} request  an http post request with a body param
 * @param {*} setIsPosting 
 * @returns 
 */
function usePostCall(endpoint, request, setSomething){
    const [error, setError] = useState(null);

    const postData = async() => {
        try{
            const response = await fetch(endpoint,request);

            if(!response.ok){
                throw Error(response.statusText);
            } else {
                //const data = await response.json();
                setSomething(prev => !prev);
            }
        } catch(error){
            setError(error);
            console.log(error);
        }
    }

    useEffect(()=>{
        if(request !== null){
            postData();
        }      
    }, [request])


    return {postData};
}

export default usePostCall;