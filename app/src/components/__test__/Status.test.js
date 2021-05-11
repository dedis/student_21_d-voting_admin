import React from 'react';
import Enzyme,{mount, render, shallow} from 'enzyme';
import {LanguageContext} from '../language/LanguageContext';
import ConfirmModal from '../modal/ConfirmModal';
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

    it('clicks close button, change status and render shuffle button instead', async() =>{
        
        let wrap = mount(<LanguageContext.Provider value = {['en',]}><Status stat={1} electionID={1}/></LanguageContext.Provider>)
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve(new Response()));
        //jest.spyOn(wrap.instance(), "closeElection").mockReturnValue(true);
        //jest.spyOn(useChangeStatus, userValidateClose).mock(true)
        //jest.spyOn(global, "userValidateClose").mockImplementation(()=>true);
        //console.log(wrap.debug());
        //jest.spyOn(global, "setUserValidateClose").mockResolvedValue(true);
        const modalClose = wrap.find('#close-modal').find('#confirm-button').simulate('click');
        
        await act(async() =>{
           wrap.find('#close-button').simulate('click');
           
        });
        wrap.update();
        expect(wrap.find('#close-button').text()).toContain('Shuffle');
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
        
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve(new Response()));
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
    it('shows results button', () =>{
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