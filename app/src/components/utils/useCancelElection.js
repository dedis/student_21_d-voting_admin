function useCancelElection(setIsCanceling){

    const cancelElectionEndpoint = "/evoting/cancel";

    async function cancelElection(electionID, userID, token){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
        }

        const response =  await fetch(cancelElectionEndpoint, request)
        let success = false;
        
        if(!response.ok){
            throw Error(response.statusText);           
        } else {
            success= true;
        }
        setIsCanceling(false);
        return success;
    };
    
    return {cancelElection};

};

export default useCancelElection;