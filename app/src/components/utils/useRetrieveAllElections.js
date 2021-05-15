import {useState, useEffect} from 'react';


/*Custom hook that retrieves an election based on the id given and the token

*/
function useRetrieveAllElections(token){
    const getAllElectionsInfoEndpoint = "/evoting/all";
    const [loading, setLoading] = useState(true);
    const [electionRetrieved, setElectionRetrieved] = useState(false);
    const [electionData, setElectionData]= useState([]);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        const request = {
            method: 'POST',
            body: JSON.stringify({'Token': token})
        }

        fetch(getAllElectionsInfoEndpoint, request).then(async response =>{
            const data = await response.json();

            //check for error
            if(!response.ok){
                const error = response.status;
                return Promise.reject(error);
            }

            setElectionData(data.AllElectionsInfo);
            setElectionRetrieved(true);
            setLoading(false);
        })
        .catch(error => {
            setError(error);
        })
    }, [])

    return [loading, electionRetrieved, error, electionData];
}

export default useRetrieveAllElections;