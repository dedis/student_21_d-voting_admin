import  {useState, useEffect} from 'react';

function useFillElectionFields(electionData){
    const [title, setTitle] = useState(null);
    const [candidates, setCandidates] = useState(null);
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const [pubKey, setPubKey] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if(electionData !== null){
            setTitle(electionData.Title);
            setCandidates(electionData.Candidates);
            setId(electionData.ElectionID);
            setStatus(electionData.Status)
            setPubKey(electionData.Pubkey);
            setResult(electionData.Result);
        }

    }, electionData)

    return {title,candidates,id,status,pubKey,result, setStatus};
}

export default useFillElectionFields;