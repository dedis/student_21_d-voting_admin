

function useCloseElection(setIsClosing){

    const closeElectionEndpoint = "/evoting/close";

    async function closeElection(electionID, userID, token){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
        }
        console.log(request);

        const response =  await fetch(closeElectionEndpoint, request)
        let success = false;
        
        if(!response.ok){
       
            
        } else {
            success= true;
        }
        setIsClosing(false);
        return success;
    };
    
    return {closeElection};

};

export default useCloseElection;