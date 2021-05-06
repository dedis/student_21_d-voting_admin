import React from 'react';
import ReactDOM from 'react-dom';
import Election from '../election-status/Election';
import renderButton from '../election-status/Election';

import {render} from '@testing-library/react';

it("renders without crashing", ()=> {
    it('should render the Election Component correctly in English', () => {  
        const component = renderer.create(<LanguageContext.Provider value = {['en',]}><Election /></LanguageContext.Provider>);
        let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });
})
