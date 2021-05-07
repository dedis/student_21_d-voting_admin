import {useState, useEffect} from 'react';


/*Custom hook that retrieves an election based on the id given and the token

*/
function useRetrieveElection(electionID, token){
    const getElectionInfoEndpoint = "/evoting/info";
    const [loading, setLoading] = useState(true);
    const [electionRetrieved, setElectionRetrieved] = useState(false);
    const [electionData, setElectionData]= useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'Token': token})
        }

        fetch(getElectionInfoEndpoint, request).then(async response =>{
            const data = await response.json();

            //check for error
            if(!response.ok){
                const error = response.status;
                return Promise.reject(error);
            }

            setElectionData(data);
            setElectionRetrieved(true);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
        })
    }, [])

    return [loading, electionRetrieved, error, electionData];
}

export default useRetrieveElection;