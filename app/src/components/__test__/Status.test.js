import React from 'react';
import Enzyme,{mount, render, shallow} from 'enzyme';
import {LanguageContext} from '../language/LanguageContext';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { act } from "react-dom/test-utils";
Enzyme.configure({ adapter: new Adapter() });
import Status  from '../election-status/Status';


describe('ChangeStatus when status initialize with 1 (ongoing)', ()=> {
    
    let wrapper;
    beforeEach(()=>{
        wrapper = render(<LanguageContext.Provider value = {['en',]}><Status status={1} electionID={1}/></LanguageContext.Provider>)
    })
    it('renders', () =>{
        //console.log(wrapper.debug());
        expect(wrapper).not.toBeNull();
    });
    it('shows button to close election', () =>{
        expect(wrapper.find('button').text()).toContain('Close');
    });
    it('shows button to cancel election', () =>{
        //console.log(wrapper.debug());
        expect(wrapper.find('button').text()).toContain('Close');
    });

    /*
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
    */

})

describe('ChangeStatus when status initialize with 2 (closed)', ()=> {
    
    let wrapper;
    let stat;
    let setStat = jest.fn();
    beforeEach(()=>{
        stat = 2;
        wrapper = mount(<LanguageContext.Provider value = {['en',]}><Status status={stat} setStatus={setStat}electionID={1}/></LanguageContext.Provider>)
    })
    it('renders', () =>{
        //console.log(wrapper.debug());
        expect(wrapper).not.toBeNull();
    });
    it('shows button to shuffle election', () =>{
        expect(wrapper.find('button').text()).toContain('Shuffle');
    });

    //idea: the decrypt button appears when status was changed
    it('clicks shuffle button and change status', async() =>{
        
        //mock fetch call to the api
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve(new Response()));
        //jest.spyOn(global, "setStatus").mockImplementation((stat)=>stat)
        
        await act(async() =>{
           wrapper.find('button').simulate('click');
        });
        wrapper.update();
        expect(setStat).toHaveBeenCalledTimes(1);
        //expect(wrapper.find('button').text()).toContain('Decrypt');
    });
})

describe('ChangeStatus when status initialize with 3 (ballots have been shuffled)', ()=> {
    
    let wrapper;
    let stat;
    let setStat = jest.fn();
    beforeEach(()=>{
        stat = 3;
        wrapper = mount(<LanguageContext.Provider value = {['en',]}><Status status={stat} setStatus={setStat}electionID={1}/></LanguageContext.Provider>)
    })
    it('renders', () =>{
        //console.log(wrapper.debug());
        expect(wrapper).not.toBeNull();
    });
    it('shows button to decrypt election', () =>{
        expect(wrapper.find('button').text()).toContain('Decrypt');
    });

    it('clicks shuffle button and change status', async() =>{
        
        //mock fetch call to the api
        jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve(new Response()));
        //jest.spyOn(global, "setStatus").mockImplementation((stat)=>stat)
        
        await act(async() =>{
           wrapper.find('button').simulate('click');
        });
        wrapper.update();
        expect(setStat).toHaveBeenCalledTimes(1);
        //expect(wrapper.find('button').text()).toContain('Decrypt');
    });
})


describe('ChangeStatus when status initialize with 5 (result available)', ()=> {
    
    let wrapper;
    let setStat = jest.fn();
    let setResultAvailable = jest.fn();
    beforeEach(()=>{
        wrapper = mount(<LanguageContext.Provider value = {['en',]}><Status status={5} setStatus = {setStat} electionID={1} setResultAvailable={setResultAvailable} /></LanguageContext.Provider>)
    })
    it('renders', () =>{
        expect(wrapper).not.toBeNull();
    });
    it('shows "results available" text', () =>{
        expect(wrapper.text().includes('Results available')).toBe(true);
    });
})

describe('ChangeStatus when status initialize with 6 (election canceled)', ()=> {
    
    let wrapper;
    let setStat = jest.fn();
    let setResultAvailable = jest.fn();
    beforeEach(()=>{
        wrapper = mount(<LanguageContext.Provider value = {['en',]}><Status status={6} setStatus = {setStat} electionID={1} setResultAvailable={setResultAvailable} /></LanguageContext.Provider>)
    })
    it('renders', () =>{
        expect(wrapper).not.toBeNull();
    });
    it('shows "canceled" text', () =>{
        expect(wrapper.text().includes('Canceled')).toBe(true);
    });
})
