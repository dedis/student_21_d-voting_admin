 /*Custom hook that sends a shuffle call to the backend when the shuffle button is clicked */

function useShuffle(setIsShuffling, setStatus){

    const shuffleBallotsEndpoint = "/evoting/shuffle";
    const address1 = '2001'; //address of a collective authority member
    const PK1 = 'RjEyNy4wLjAuMToyMDAx:CZraHKej4wYW/+Xs5DU2a31usUx+zspAoUwPES/uI8s=';
    const address2 = '2002';
    const PK2 = 'RjEyNy4wLjAuMToyMDAy:gYqQlxg/DbpKzECFfggHoU6YmjsNNV9P/KxQxZF4Ukc=';
    const address3 = '2003';
    const PK3 = 'RjEyNy4wLjAuMToyMDAz:sJWa0d7jduhpOKMr/VcjTAcChq8lo6wvXRfz0p163T8=';
    const CollectiveAuthorityMembers = [{'Address' : address1,'PublicKey':PK1}, {'Address' : address2,'PublicKey':PK2}, {'Address' : address3,'PublicKey':PK3}];

    async function shuffleElection(electionID, userID, token){
        const request = {
            method: 'POST',
            body: JSON.stringify({'ElectionID':electionID, 'UserId':userID,'Token': token, 'Members': CollectiveAuthorityMembers})
        }

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