import React from 'react';
import Enzyme,{mount, render, shallow} from 'enzyme';
import {LanguageContext} from '../language/LanguageContext';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from "react-dom/test-utils";
Enzyme.configure({ adapter: new Adapter() });

import useChangeStatus from '../utils/useChangeStatus'; 
import Status  from '../election-status/Status';

describe('ChangeStatus when status intialize with 1 (ongoing)', ()=> {
    
    let wrapper;
    beforeEach(()=>{
        wrapper = render(<LanguageContext.Provider value = {['en',]}><Status stat={1} electionID={1}/></LanguageContext.Provider>)
    })
    it('renders', () =>{
        //console.log(wrapper.debug());
        expect(wrapper).not.toBeNull();
    });
    it('shows button to close election', () =>{
        //console.log(wrapper.debug());
        expect(wrapper.find('button').text()).toContain('Close');
    });
    it('shows button to cancel election', () =>{
        //console.log(wrapper.debug());
        expect(wrapper.find('button').text()).toContain('Close');
    });

})

describe('ChangeStatus when status intialize with 2 (closed)', ()=> {
    
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(<LanguageContext.Provider value = {['en',]}><Status stat={2} electionID={1}/></LanguageContext.Provider>)
    })
    it('renders', () =>{
        //console.log(wrapper.debug());
        expect(wrapper).not.toBeNull();
    });
    it('shows button to shuffle election', () =>{
        expect(wrapper.find('button').text()).toContain('Shuffle');
    });


    it('clicks shuffle button, change status and render encrypt button instead', async() =>{
        
        jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve(new Response()));
        await act(async() =>{
           wrapper.find('button').simulate('click');
        });
        wrapper.update();
        expect(wrapper.find('button').text()).toContain('Decrypt');
    });
})

describe('ChangeStatus when status intialize with 5 (result available)', ()=> {
    
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(<LanguageContext.Provider value = {['en',]}><Status stat={5} electionID={1}/></LanguageContext.Provider>)
    })
    it('renders', () =>{
        //console.log(wrapper.debug());
        expect(wrapper).not.toBeNull();
    });
    it('shows button to shuffle election', () =>{
        expect(wrapper.find('button').text()).toContain('See results');
    });

/*
    it('clicks see results button', async() =>{
        
        jest.spyOn(global, "fetch").mockImplementation(() =>    Promise.resolve(new Response()));
        await act(async() =>{
           wrapper.find('button').simulate('click');
        });
        wrapper.update();
        //expect(wrapper.find('button').text()).toContain('Decrypt');
    });
*/
    

})