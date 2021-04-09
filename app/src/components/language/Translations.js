import React from 'react';

export const Translations = {
    en: {
        navBarHome: 'Home',
        navBarCreate: 'Create an election',
        navBarStatus: 'Election status',
        navBarVote: 'Vote',
        navBarAbout: 'About',
        homeTitle: 'Welcome to our e-voting platform!',
        homeText: 'Use the navigation bar above to reach the the page you want.',
        elecName:'Election name',
        namePlaceHolder: 'Enter the name',
        addCandidate: 'Add a candidate',
        addCandPlaceHolder: 'candidate\'s name',
        add: 'Add',
        delete: 'Delete',
        createElec: 'Create election',
        upload: 'Choose a json file from your computer:',
        about: 'This website hosts an evoting interface based on <a href="https://github.com/dedis/dela">Dela</a>, the latest blockchain-based distributed ledger from the DEDIS lab.',
        create: 'Create a new election by filling out the information below or by uploading a json file',
        errorCandidates: 'You must add at least one candidate!',
        errorNewCandidate: 'Are you sure you don\'t want to add the candidate?',
        electionSuccess:'Your election was successfully submitted!',
        ellectionFail: 'Election creation failed! ${e.message}'
    },

    fr: {
        navBarHome: 'Home',
        navBarCreate: 'Créer une élection',
        navBarStatus: 'Statut des élections',
        navBarVote: 'Voter',
        navBarAbout: 'A propos',
        homeTitle: 'Bienvenue sur notre platforme d\'e-voting !',
        homeText: 'Utilisez la barre de navigation au sommet de la page pour vous déplacer',
        elecName:'Nom de l\'élection',
        namePlaceHolder: 'Tapez le nom',
        addCandidate: 'Ajouter un candidat',
        addCandPlaceHolder: 'nom du candidat',
        add: 'Ajouter',
        delete:'Supprimer',
        createElec: 'Créer l\'élection',
        upload: 'Sélectionnez un fichier depuis votre ordinateur:',
        about: '',
        create: 'Créez une nouvelle élection en remplissant le formulaire ci-dessous ou en téléchargeant un fichier json',
        errorCandidates: 'Au minimum un candidat est requis',
        errorNewCandidate: 'Etes-vous sûr(e) de ne pas vouloir ajouter le candidat?',
        electionSuccess: 'L\'élection a été créée avec succès!',
        electionFail: 'La création de l\'élection a échoué! ${e.message}'
    }
}

