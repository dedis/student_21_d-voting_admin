import kyber from "@dedis/kyber";


const encrypt = require('../voting/VoteEncrypt');

describe("Encrytion tests", () => {
    const edCurve = kyber.curve.newCurve("edwards25519")
    /*Generate random private/public key pair to test the encryption and decryption
    In reality the public dkg key is retrieved by the app but the private key
    is not accessible and is actually a distributed private key */
    const privateKey = edCurve.scalar().pick();
    const publicKey = edCurve.point().mul(privateKey,null).marshalBinary();

    const vote = 'Tom';

    const decryptVote = (ephemeralKey, encryptedVote, privateKey) => {
            const S = edCurve.point().mul(privateKey, ephemeralKey);
            const M = edCurve.point().sub(encryptedVote,S);
            return M.data().toString();
    }
    

    test('correctly decrypt string', () => {
        const [ephemeralKey, encryptedVote] = encrypt.encryptVote(vote, publicKey, edCurve);
        expect(decryptVote(ephemeralKey, encryptedVote, privateKey)).toBe(vote);
    });

    test('embed plain point is not equal of encrypted cipher point', () => {
        const enc = new TextEncoder();
        const voteByte = enc.encode(vote); //vote as []byte  
        const voteBuff = Buffer.from(voteByte.buffer);
        const M = edCurve.point().embed(voteBuff); 
        const [ephemeralKey, encryptedVote] = encrypt.encryptVote(vote, publicKey, edCurve);
        expect(M.equals(encryptedVote)).toBe(false);
    })
})