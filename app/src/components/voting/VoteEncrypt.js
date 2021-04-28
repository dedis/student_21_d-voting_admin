import kyber from "@dedis/kyber";
import {React, useState, useEffect, useContext} from 'react';

export function encryptVote(vote, dkgKey, edCurve){
    
    
    //embed the vote into a curve point
    const enc = new TextEncoder();
    const voteByte = enc.encode(vote); //vote as []byte  
    const voteBuff = Buffer.from(voteByte.buffer);
    const M = edCurve.point().embed(voteBuff); 

    //TODO: deal with message bigger than 29 bytes
    /*
    const max = edCurve.point().embedLen();
    if(max > voteByte.length){
        max = voteByte.length;
    }
    const remainder = voteByte.subarray(max,voteByte.length);
    */

    //dkg public key as a point on the EC 
    const keyBuff = dkgKey;//Buffer.from(unpack(sessionStorage.getItem('pubKey')).buffer);
    const p = edCurve.point();
    p.unmarshalBinary(keyBuff); //unmarshall dkg public key
    const pubKeyPoint = p.clone(); //get the point corresponding to the dkg public key

    const k = edCurve.scalar().pick();  //ephemeral private key
    const K = edCurve.point().mul(k, null); // ephemeral DH public key
    
    const S = edCurve.point().mul(k, pubKeyPoint); //ephemeral DH shared secret
    const C = S.add(S,M); //message blinded with secret


    //(K,C) are what we'll send to the backend TODO: add the remainder?
    //TODO if time : symmetric key sent with encrypted vote or vote limitation
    return [K,C];
}