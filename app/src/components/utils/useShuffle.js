 /*Custom hook that sends a shuffle call to the backend when the shuffle button is clicked */

function useShuffle(setIsShuffling, setStatus){

    const shuffleBallotsEndpoint = "/evoting/shuffle";
    const address1 = 'RjEyNy4wLjAuMToyMDAx'; //address of a collective authority member
    const PK1 = '0jnEzhVqqHORdZrynCse8ns9sP7VBTJI1w5Uab6w6+w=';
    const address2 = 'RjEyNy4wLjAuMToyMDAy';
    const PK2 = 'R+RL1V8xrPkrAo43voUSNtXE/9hIF1+zSy5fFFFIfE8=';
    const address3 = 'RjEyNy4wLjAuMToyMDAz';
    const PK3 = 'rpn1PO8DtP8nT68esyeJMrac3BMTkxqfvmB4cWF54tg=';
    const CollectiveAuthorityMembers = [{'Address' : address1,'PublicKey':PK1}, {'Address' : address2,'PublicKey':PK2}, {'Address' : address3,'PublicKey':PK3}];

    async function shuffleElection(electionID, userID, token){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token, 'Members': CollectiveAuthorityMembers})
        }
        console.log(request);
        try {
            const response = await fetch(shuffleBallotsEndpoint,request);
            if(!response.ok){
                throw Error(response.statusText);
            }
        } catch(error){
            console.log(error);
        }
        setIsShuffling(false);
        setStatus(3);
    }
    return {shuffleElection};

};

export default useShuffle;