


import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../login/Login';
import renderer from 'react-test-renderer';
import {LanguageContext} from '../language/LanguageContext'


import {render} from '@testing-library/react';

describe('Login', ()=> {
    it('should render the Login Component correctly', () => {  
        const component = renderer.create(<LanguageContext.Provider value = {['en',]}><Login /></LanguageContext.Provider>);
        let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    });

    it('should render the Login Component correctly', () => {  
        const component = renderer.create(<LanguageContext.Provider value = {['en',]}><Login /></LanguageContext.Provider>);
       
    });
})