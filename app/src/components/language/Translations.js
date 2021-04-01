import React from 'react';

export const Translations = {
    en: {
        navBarHome: 'Home',
        navBarCreate: 'Create an election',
        navBarStatus: 'Election status',
        navBarVote: 'Vote',
        navBarAbout: 'About',
        about: 'This website hosts an evoting interface based on <a href="https://github.com/dedis/dela">Dela</a>, the latest blockchain-based distributed ledger from the DEDIS lab.',
        create: 'Create a new election by filling out the information below or by uploading a json file',
        errorCandidates: 'You must add at least one candidate!',
        errorNewCandidate: 'Are you sure you don\'t want to add the candidate?',
        electionSuccess:'Your election was successfully submitted!',
        ellectionFail: 'Election creation failed! ${e.message}'
    },

    fr: {
        navBarHome: 'Home',
        navBarCreate: 'Créez une élection',
        navBarStatus: 'Statut des élections',
        navBarVote: 'Votez',
        navBarAbout: 'A propos',
        about: '',
        create: 'Créez une nouvelle élection en remplissant le formulaire ci-dessous ou en téléchargeant un fichier json',
        errorCandidates: 'Au minimum un candidat est requis',
        errorNewCandidate: 'Etes-vous sûr(e) de ne pas vouloir ajouter le candidat?',
        electionSuccess: 'L\'élection a été créée avec succès!',
        electionFail: 'La création de l\'élection a échoué! ${e.message}'
    }
}

