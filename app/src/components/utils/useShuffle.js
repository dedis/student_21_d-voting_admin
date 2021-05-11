 /*Custom hook that sends a shuffle call to the backend when the shuffle button is clicked */

function useShuffle(setIsShuffling, setStatus){

    const shuffleBallotsEndpoint = "/evoting/shuffle";
    const address1 = 'RjEyNy4wLjAuMToyMDAx'; //address of a collective authority member
    const PK1 = 'KFc2NL/u4+RmGzuo4awdTh61lJWjMz44dnL3BWtrZ+I=';
    const address2 = 'RjEyNy4wLjAuMToyMDAy';
    const PK2 = 'FAGHiEOb2Sq5BhAQEuqqdg6TVGr6OYvkA4MlVZ65yFY=';
    const address3 = 'RjEyNy4wLjAuMToyMDAz';
    const PK3 = 'rmxG6mJQ4Qv4wgbYuSBf0T8Kjm/MKHhYvD6o8fyao94=';
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