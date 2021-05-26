
import useFetchCall from './useFetchCall';
import useFillElectionFields from './useFillElectionFields';
import {GET_ELECTION_ENDPOINT} from './Endpoints';


function useElection(electionID, token){

    const request = {
        method: 'POST',
        body: JSON.stringify({'ElectionID':electionID,'Token': token})
    }
    const [data, loading, error] = useFetchCall(GET_ELECTION_ENDPOINT, request);
    const {title,candidates,id,status,pubKey,result,setResult, setStatus, isResultSet, setIsResultSet} = useFillElectionFields(data);
    //useResult(status, setResult)
    return {loading, title, candidates,electionID,status,pubKey,result, setResult, setStatus, isResultSet, setIsResultSet}
}

export default useElection;