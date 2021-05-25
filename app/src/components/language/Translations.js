import {React,Fragment} from 'react';

export const Translations = {
    en: {
        navBarHome: 'Home',
        navBarCreate: 'Create an election',
        navBarStatus: 'Election status',
        navBarVote: 'Vote',
        navBarAbout: 'About',
        homeTitle: 'Welcome to our e-voting platform!',
        homeText: 'Use the navigation bar above to reach the the page you want.',
        loginText: 'You need to login to access the content of the website.',
        elecName:'Election name',
        namePlaceHolder: 'Enter the name',
        addCandidate: 'Add a candidate',
        addCandPlaceHolder: 'candidate\'s name',
        add: 'Add',
        delete: 'Delete',
        createElec: 'Create election',
        upload: 'Choose a json file from your computer:',
        notJson: 'The file is not a json file.',
        noFile: 'No file found',
        create: 'Create a new election by filling out the information below or by uploading a json file',
        errorCandidates: 'You must add at least one candidate!',
        errorNewCandidate: 'Are you sure you don\'t want to add the candidate?',
        electionSuccess:'Your election was successfully submitted!',
        electionFail: 'Election creation failed!',
        clickElection: 'Click on the election name to display additional details.',
        noElection:'No election were retrieved!',
        listElection: 'This page lists all the elections that have ever been created.',
        loading: 'Loading...',
        electionDetails: 'Election details',
        status: 'Status:',
        startDate: 'Start date:',
        candidates: 'Candidates:',
        back: 'Back',
        close: 'Close',
        cancel: 'Cancel',
        confirmCloseElection: 'Are you sure you want to close this election?',
        confirmCancelElection: 'Are you sure you want to cancel this election?',
        statusOpen: 'Open',
        statusClose:'Closed',
        statusCancel: 'Canceled',
        resultsAvailable: 'Results available',
        alreadyVoted: 'You have already voted for',
        alreadyVoted2: 'on this election.',
        changeVote:  'You can change your vote by simply casting a new vote.',
        pickCandidate: 'Pick a candidate:',
        voteSuccess: 'Your vote was successfully submitted!',
        voteFailure : 'Your ballot hasn\'t been taken into account. It might be that the election has been closed or cancelled. Try refreshing the page.',
        noCandidate: 'You need to select a candidate.',
        castVote: 'Cast vote',
        noVote: 'There is currently nothing to vote on.',
        voteAllowed: 'You are allowed to vote on the election(s) below. Click on the name to display the ballot.',
        shuffle: 'Shuffle',
        decrypt: 'Decrypt',
        operationFailure: 'The operation failed. Try refreshing the page.',
        shuffleFail : 'The shuffle operation failed.',
        voteImpossible: 'The election is not open anymore.',
        yes: 'Yes',
        about: <Fragment>
            This website hosts the interface of an evoting system. This system runs smart contracts, handled by a set of Byzantine fault-tolerant nodes.
        <br/>
        <br/>
        When an administrator creates an election, the election parameters are saved on a blockchain and so are every following transaction (closing/cancelling election, casting a vote,...). 
        <br/>
        <br/>
        A distributed key is generated at election creation time so that when a user votes, his/her vote is encrypted with the key guarantying the anonymity of the vote. However the system doesn't enforce the anonymity of the voter. 
        <br/>
        <br/>
        When an election is closed, the nodes shuffle the ballots and check its correctness before decrypting the shuffle and publish the result of the election on a smart contract.
             </Fragment>,
        
    },

    fr: {
        navBarHome: 'Accueil',
        navBarCreate: 'Créer une élection',
        navBarStatus: 'Statut des élections',
        navBarVote: 'Voter',
        navBarAbout: 'A propos',
        homeTitle: 'Bienvenue sur notre platforme d\'e-voting !',
        homeText: 'Utilisez la barre de navigation au sommet de la page pour vous déplacer sur le site.',
        loginText: 'Vous devez vous connecter pour avoir accès au contenu du site.',
        elecName:'Nom de l\'élection',
        namePlaceHolder: 'Tapez le nom',
        addCandidate: 'Ajouter un candidat',
        addCandPlaceHolder: 'nom du candidat',
        add: 'Ajouter',
        delete:'Supprimer',
        createElec: 'Créer l\'élection',
        upload: 'Sélectionnez un fichier depuis votre ordinateur:',
        notJson: 'Le fichier n\'est pas un fichier json.',
        noFile : 'Aucun fichier trouvé.',
        create: 'Créez une nouvelle élection en remplissant le formulaire ci-dessous ou en téléchargeant un fichier json',
        errorCandidates: 'Au minimum un candidat est requis',
        errorNewCandidate: 'Etes-vous sûr(e) de ne pas vouloir ajouter le candidat?',
        electionSuccess: 'L\'élection a été créée avec succès!',
        electionFail: 'La création de l\'élection a échoué!',
        clickElection: 'Cliquez sur le nom de l\'élection pour afficher ses détails.',
        noElection:'Aucun élection n\'a été trouvée!',
        listElection: 'Cette page affiche toutes les élections créées.',
        loading: 'En chargement...',
        electionDetails: 'Détails de l\'élection',
        status: 'Status:',
        startDate: 'Date de début:',
        candidates: 'Candidats:',
        back: 'Retour',
        close: 'Terminer',
        cancel: 'Annuler',
        confirmCloseElection: 'Etes-vous sûr(e) de vouloir terminer l\'élection?',
        confirmCancelElection: 'Etes-vous sûr(e) de vouloir annuler l\'élection?',
        statusOpen: 'En cours',
        statusClose: 'Terminée',
        statusCancel: 'Annulée',
        resultsAvailable: 'Résultat disponible',
        alreadyVoted: 'Vous avez déjà voté pour ',
        alreadyVoted2: '.',
        changeVote:  'Vous pouvez simplement modifier votre vote en soumettant un nouveau choix.',
        pickCandidate: 'Choisissez un candidat:',
        voteSuccess: 'Votre vote a été transmis avec succès!',
        voteFailure : 'Votre vote n\'a pas été pris en compte. Il est possible que l\'élection ait été terminée ou annulée entre temps. Essayez de rafraîchir la page.',
        noCandidate: 'Veuillez sélectionner un candidat.',
        castVote: 'Voter',
        noVote: 'Il n\'y a actuellement aucune votation en cours.',
        voteAllowed: 'Vous pouvez participer au(x) élection(s) ci-dessous. Cliquez sur le nom pour accéder au scrutin.',
        shuffle: 'Mélanger',
        decrypt: 'Décrypter',
        operationFailure: 'L\'opération a échoué. Essayez de rafraîchir la page.',
        shuffleFail: 'L\'opération ???????',
        voteImpossible: 'Il n\'est plus possible de voter pour l\'élection.',
        yes: 'Oui',
        about: <Fragment>
        Ce site Internet héberge l'interface d'un système de vote électronique. Ce système exécute des contrats intelligents basés sur le problème des généraux byzantins.
    <br/>
    <br/>
    Lorsqu'un administrateur crée une élection, les paramètres de l'élection ainsi que toutes les transactions futures (terminer/annuler une élection, voter,...) sont sauvegardés sur une blockchain. 
    <br/>
    <br/>
    Une clé distribuée est générée lors de la création d'une élection. Quand un utilisateur vote, son vote est encrypté avec cette clé ce qui garantit l'anonymat du vote. Il est important de noter que le système de ne garantit cependant pas l'anonymat de la personne qui vote.
    <br/>
    <br/>
    Lorsqu'une élection est terminée, les noeuds mélangent les scrutins et contrôlent que tout s'est passé correctemenet avant de décrypter et publier le résultat de l'élection sur un contrat intelligent.
         </Fragment>,
    }
}

