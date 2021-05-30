import {useEffect, useState} from 'react';

/**
 * 
 * @param {*} endpoint  api endpoint
 * @param {*} request  an http post request with a body param
 * @param {*} setIsPosting 
 * @returns 
 */
const usePostCall = (setError) => {

    const postData = async(endpoint, request, setIsPosting) => {
        try{
            
            const response = await fetch(endpoint,request);
            if(!response.ok){
                //console.log(await response.text());
                let err = await response.text()
                
                throw Error(err);
                return false;
            } else {
                //const data = await response.json();
                setError(null);
                setIsPosting(prev => !prev);
                return true;
            }
        } catch(error){
            //console.log(error.message);
            setError(error.message);
            setIsPosting(prev => !prev);
            console.log(error.message);
            return false;
        }
    }


    return {postData};
}

export default usePostCall;