

function useCloseElection(setIsClosing){

    const closeElectionEndpoint = "/evoting/close";

    async function closeElection(electionID, userID, token){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
        }

        const response =  await fetch(closeElectionEndpoint, request)
        let success = false;
        
        if(!response.ok){
            throw Error(response.statusText);           
        } else {
            success= true;
        }
        setIsClosing(false);
        return success;
    };
    
    return {closeElection};

};

export default useCloseElection;