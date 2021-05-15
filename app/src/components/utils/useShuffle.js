 /*Custom hook that sends a shuffle call to the backend when the shuffle button is clicked */

function useShuffle(setIsShuffling){

    const shuffleBallotsEndpoint = "/evoting/shuffle";
    const address1 = 'RjEyNy4wLjAuMToyMDAx'; //address of a collective authority member
    const PK1 = 'DfOtXGZns8IubF5wh+IDEIwjYlBx5ofbm88z1vRQk4s=';
    const address2 = 'RjEyNy4wLjAuMToyMDAy';
    const PK2 = 'lepJT83zWVI/4kibC1o1euJ0VufJ1LBb/15Jn0egKw4=';
    const address3 = 'RjEyNy4wLjAuMToyMDAz';
    const PK3 = 'il9GfZ7kfKQUmZg5d0/LdhmKVknbKb+2wNgVhQ2Ina4=';
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
    }
    return {shuffleElection};

};

export default useShuffle;