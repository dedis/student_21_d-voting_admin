import {useEffect, useState} from 'react';

/**
 * 
 * @param {*} endpoint  api endpoint
 * @param {*} request  an http post request with a body param
 * @param {*} setIsPosting 
 * @returns 
 */
function usePostCall(setError){

    const postData = async(endpoint, request, setIsPosting) => {
        try{
            const response = await fetch(endpoint,request);

            if(!response.ok){
                throw Error(response.statusText);
            } else {
                //const data = await response.json();
                setIsPosting(prev => !prev);
                return true;
            }
        } catch(error){
            console.log("it caught an error");
            
            setError(error);
            setIsPosting(prev => !prev);
            console.log(error);
        }
    }


    return {postData};
}

export default usePostCall;