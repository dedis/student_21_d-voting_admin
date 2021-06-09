# Front-end of the DELA evoting system
 This project is the front-end part of an evoting system based in [dela](https://github.com/dedis/dela), a distributed ledger from the DEDIS lab.

 It allows the user to create a new election, close/cancel it and also vote on on-going elections.
 All the elections and their operations are saved on smart contracts from dela.
 
  There is currently no real authentication mechanism, simply a login button that gives an id and a token to a user. When a user cast a vote, his/her vote is encrypted using the dkg public key of the nodes running the dela system. The anonymity of a voter is not guaranteed, only the content of the vote meaning that it is possible to know who voted.
 It needs to have Dela nodes running every time you want to run the frontend web-application.
 The user interface uses [React](https://reactjs.org/), a javascript library. You can find the instruction about running a react-app in the app folder.
 
# Installation instruction of Dela library
 For the front-end to work, you need to have 3 dela nodes running on your computer. To do that, you first need to clone the [dela/dedis](https://github.com/dedis/dela) repository and then go on the `d-voting-code-refactoring` branch. Memcoin is the default CLI to handle Dela nodes. You can find it in “cli/node/memcoin”. Be sure to run “go install” in it and add GOPATH/bin to your PATH environment. You also need to run "go install" in cli/crypto.

 ## Running the Dela nodes
 For all the following instruction, you should be in the dela folder.
 Then run :
 ```
 LLVL=info memcoin --config /tmp/node1 start --port 2001
 LLVL=info memcoin --config /tmp/node2 start --port 2002
 LLVL=info memcoin --config /tmp/node3 start --port 2003
 ```
Now run the file `3nodes.sh` (that can be found in the dela folder). 

You also need to run 
```
 memcoin --config /tmp/node1 dkg export
 memcoin --config /tmp/node2 dkg export
 memcoin --config /tmp/node3 dkg export
```
These 3 commands will display in the terminal 'addressOfNode:keyOfNode', information that you will need to update a front-end file as described in the following section.

# Updating the address and the public key of the Dela node

Every time you run the 3 nodes, their address and their public key might change so you need to hardcode those in the app/src/components/utils/CollectiveAuthorityMembers.js that can be found in this repository. You need to update `const address1, PK1, address2, PK2, address3, PK3` with the values obtained in the previous section.


# Dependencies
The project uses the following external libraries: 
* [dedis/cothority](https://github.com/dedis/cothority/tree/main/external/js/kyber) which is uses for elliptic curve cryptography when encrypting a vote
* [mui-org/material-ui](https://github.com/mui-org/material-ui)
* [ReactTraining/react-router](https://github.com/ReactTraining/react-router)


# Running the tests
The unit tests can be found in src/components/_test_ folder. They can be run with `npm run test`.
