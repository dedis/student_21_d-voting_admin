import useFillElectionFields from './useFillElectionFields';

function ElectionFields(electionData){
    const {title,candidates,id,status,pubKey,result, setStatus} = useFillElectionFields(electionData);
    return {title,candidates,id,status,pubKey,result, setStatus};
}

export default ElectionFields;