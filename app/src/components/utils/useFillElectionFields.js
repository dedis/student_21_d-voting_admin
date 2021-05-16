import  {useState, useEffect} from 'react';

function useFillElectionFields(electionData){
    const [title, setTitle] = useState(null);
    const [candidates, setCandidates] = useState(null);
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const [pubKey, setPubKey] = useState(null);
    const [result, setResult] = useState(null);
    const [isResultSet, setIsResultSet] = useState(false);

    useEffect(() => {
        if(electionData !== null){
            setTitle(electionData.Title);
            setCandidates(electionData.Candidates);
            setId(electionData.ElectionID);
            setStatus(electionData.Status)
            setPubKey(electionData.Pubkey);
            setResult(electionData.Result);
            if(electionData.Result.length !== 0){
                setIsResultSet(true);
            }
        }

    }, electionData)

    return {title,candidates,id,status,pubKey,result, setStatus, isResultSet};
}

export default useFillElectionFields;