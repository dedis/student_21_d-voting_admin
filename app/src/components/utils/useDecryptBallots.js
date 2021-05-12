/*custom hook that can send a request to decrypt the ballots of a given election*/
function useDecryptBallots(){
    const decryptBallotsEndpoint = "/evoting/decrypt";

    async function decryptBallots(electionID, userID, token, setStatus){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token})
        }
        try{
            const response = await fetch(decryptBallotsEndpoint,request);

            if(!response.ok){
                throw Error(response.statusTest);
            }
            setStatus(5);
        } catch(error){
            console.log(error);
        }
        
    }
    return {decryptBallots};
}

export default useDecryptBallots;