import {React, useContext} from 'react';
import SimpleTable from '../utils/SimpleTable';
import {OPEN} from '../utils/StatusNumber';
import './BallotsGrid.css';
import {Translations} from '../language/Translations';
import {LanguageContext} from '../language/LanguageContext';

const BallotsGrid = () => {
    const [context,] = useContext(LanguageContext);
    return (<div>
        <SimpleTable statusToKeep={OPEN} pathLink='vote' textWhenData={Translations[context].voteAllowed} textWhenNoData={Translations[context].noVote}/>
    </div>)
}

export default BallotsGrid;