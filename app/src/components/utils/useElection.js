
import useFetchCall from './useFetchCall';
import useElectionFields from './useElectionFields';


function useElection(electionID, token){

    const request = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID,'Token': token})
    }
    const endpoint = "/evoting/info";
    const [data, loading, error] = useFetchCall(endpoint, request);
    const {title,candidates,status,pubKey,result, setResult, setStatus} = useElectionFields(data);
    //useResult(status, setResult)
    return {loading, title,candidates,electionID,status,pubKey,result, setResult, setStatus}
}

export default useElection;