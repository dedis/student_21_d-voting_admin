function useCancelElection(setIsCanceling){

    const cancelElectionEndpoint = "/evoting/cancel";

    async function cancelElection(electionID, userID, token){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
        }
        console.log(request);

        const response =  await fetch(cancelElectionEndpoint, request)
        let success = false;
        
        if(!response.ok){
       
            
        } else {
            success= true;
        }
        setIsCanceling(false);
        return success;
    };
    
    return {cancelElection};

};

export default useCancelElection;