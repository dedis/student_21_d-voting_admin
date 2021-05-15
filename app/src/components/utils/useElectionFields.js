import {useState, useEffect} from 'react';

/**
 * 
 * @param {*} electionData : an election with the title, candidates, status and public key
 * @returns 
 */
function useElectionFields(electionData){

    const [title, setTitle] = useState(null);
    const [candidates, setCandidates] = useState(null);
    const [id, setId] = useState(null);
    const [status, setStatus] = useState(null);
    const [pubKey, setPubKey] = useState(null);
    const [result, setResult] = useState(null);

    useEffect(() => {
        if(electionData !== null){
            console.log(electionData.ElectionID);
            setTitle(electionData.Title);
            setCandidates(electionData.Candidates);
            setId(electionData.ElectionID);
            setStatus(electionData.Status)
            setPubKey(electionData.Pubkey);
        }
        console.log("useEffect");

    }, [electionData])


    return {title,candidates,id,status,pubKey,result, setResult, setStatus};

}

export default useElectionFields;