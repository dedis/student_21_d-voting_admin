import {GET_RESULT_ENDPOINT} from './Endpoints';

function useGetResults(){
    const getElectionResultEndpoint = "/evoting/result";

    async function getResults(electionID, token, setError){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID,'Token': token})
        }
        try{
            const response = await fetch(GET_RESULT_ENDPOINT,request);

            if(!response.ok){
                throw Error(response.statusTest);
            } else {
                let data = await response.json();
                //setResult(data.Result);
                console.log(data.Result);
            }
        } catch(error){
            setError(error);
            console.log(error);
        }       
    }
    return {getResults};
}

export default useGetResults;