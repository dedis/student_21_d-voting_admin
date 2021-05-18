
import {screen } from '@testing-library/react';
import Enzyme, {mount, render, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import App from './App';
import React from 'react'

import renderer from 'react-test-renderer';


describe('shallow render of App', ()=> {
    
  let wrapper;
  beforeEach(()=>{
      wrapper = shallow(<App />);
  })

  
  it('renders App', () =>{
    console.log(wrapper.debug());
    expect(wrapper).not.toBeNull();
});

})