
function useGetResults(){
    const getElectionResultEndpoint = "/evoting/result";

    async function getResults(electionID, token, setResult){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID,'Token': token})
        }
        try{
            const response = await fetch(getElectionResultEndpoint,request);

            if(!response.ok){
                throw Error(response.statusTest);
            } else {
                let data = await response.json();
                //setResult(data.Result);
                console.log(data.Result);
            }
        } catch(error){
            console.log(error);
        }
        
    }
    return {getResults};
}


export default useGetResults;