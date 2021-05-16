
import useFetchCall from './useFetchCall';
import useFillElectionFields from './useFillElectionFields';


function useElection(electionID, token){

    const request = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID,'Token': token})
    }
    const endpoint = "/evoting/info";
    const [data, loading, error] = useFetchCall(endpoint, request);
    const {title,candidates,id,status,pubKey,result, setStatus} = useFillElectionFields(data);
    //useResult(status, setResult)
    return {loading, title, candidates,electionID,status,pubKey,result, setStatus}
}

export default useElection;