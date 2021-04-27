import {React, useState, useEffect, useContext} from 'react';
import Ballot from './Ballot';
import './CastBallot.css';
import useFetchData from '../useFetchData';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';
import Modal from '../modal/Modal';
import kyber from "@dedis/kyber";



function CastBallot(){

    
    
 
    const [loading,electionRetrieved, electionData] =  useFetchData('https://60475e95b801a40017ccbff6.mockapi.io/api/election/1', true); 
    const [context, ] = useContext(LanguageContext);

    const castBallotEndPoint = "/evoting/cast";

    const [choice, setChoice] = useState('');
    const [errors, setErrors] = useState({});
    const [lastVote, setLastVote] = useState('');
    const [showModal, setShowModal] = useState(false);


    useEffect(()=> {
        fetchItems();
    }, []); /*!!!! need to check what this empty array means */ 


    const fetchItems = async() => {
        
        let choiceCached = sessionStorage.getItem('myVote');
        setChoice(choiceCached);
        setLastVote(choiceCached);

    } 

    const handleCheck = (choiceSelected) =>{
            setChoice(choiceSelected);
    }

    function unpack(str) {
        var bytes = [];
        var b  =str.split(",");
        
        for(var i = 0; i < b.length; i++) {
            var char = parseInt(b[i]);
            bytes.push(char);
        }

        return new Uint8Array(bytes);
    }

    /*Encrypt the vote on the EC using the dkg public key */
    const encryptVote = ()  =>{
        const edCurve = kyber.curve.newCurve("edwards25519")
        
        //embed the vote into a curve point
        const enc = new TextEncoder();
        const voteByte = enc.encode(choice); //vote as []byte      
        const buff = Buffer.from(voteByte.buffer);
        const M = edCurve.point().embed(buff); 

        //TODO: deal with message bigger than 29 bytes
        /*
        const max = edCurve.point().embedLen();
        if(max > voteByte.length){
            max = voteByte.length;
        }
        const remainder = voteByte.subarray(max,voteByte.length);
        */

        //dkg public key as a point on the EC 
        const keyBuff = Buffer.from(unpack(sessionStorage.getItem('pubKey')).buffer);
        const p = edCurve.point();
        p.unmarshalBinary(keyBuff); //unmarshall dkg public key
        const pubKeyPoint = p.clone(); //get the point corresponding to the dkg public key

        const k = edCurve.scalar().pick();  //ephemeral private key
        const K = edCurve.point().mul(k, null); // ephemeral DH public key
        
        const S = edCurve.point().mul(k, pubKeyPoint); //ephemeral DH shared secret
        const C = S.add(S,M); //message blinded with secret


        //(K,C) are what we'll send to the backend TODO: add the remainder?
        return [K,C];
    }
    
    const sendBallot = async() =>{
        /*TODO: API call to send ballot to backend */
        const ballot = {};
       
        sessionStorage.setItem('myVote', choice);

        setShowModal(prev => !prev);
        
        const [K,C] = encryptVote();

        const KBuff = K.toProto();
        const CBuff = C.toProto();
        const vote = [...Buffer.concat([KBuff,CBuff])].map(x => parseInt(x,10));

        ballot['ElectionID'] = 0;
        ballot['UserId'] = sessionStorage.getItem('id');       
        ballot['Ballot'] = vote;
        ballot['Token'] = sessionStorage.getItem('token');

        //sending the ballot to evoting server
        try{
            const response = await fetch(castBallotEndPoint, {
                method: 'POST',
                body: JSON.stringify(ballot)
            });
        /*TODO:Need to deal with the response */
            if(response.ok){
            const data = await response.json();
            console.log(data);
            return ;
            } else{
                console.log("ERROR!")
                return (-1);
            }

 
        } catch(e) {
            
            return e;
        }


    }

    const handleClick = () => {
        let errors = {};
        if(choice === ''){
            errors['noCandidate'] = Translations[context].noCandidate
            setErrors(errors);
            return;
        }
        setLastVote(choice);
        sendBallot();
        //setChoice('');
        setErrors({});
    }

    const showBallot = () => {
        return (
            <div>
                <Modal showModal={showModal} setShowModal={setShowModal} textModal = {Translations[context].voteSuccess} buttonRight={Translations[context].close} />
                {electionRetrieved? 
                /* TODO: check that the election is open */
                (<div className='cast-ballot-card'>
                <Ballot electionData={electionData} choice={choice} handleCheck = {handleCheck} lastVote={lastVote}></Ballot>
                <div className='cast-ballot-error'>{errors.noCandidate}</div>
                <button className='cast-ballot-btn' onClick={handleClick}>{Translations[context].castVote}</button>
                </div>)
                : <p>{Translations[context].noVote}</p>}
            </div>

        )


    }

    return (
        <div className = 'cast-ballot'>
            <div className='ballot-indication'>{Translations[context].voteAllowed}</div>
            {!loading? showBallot() : <p></p>}

            
        </div>
    )
}

export default CastBallot;