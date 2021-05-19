
import {render } from '@testing-library/react';
import Enzyme, {mount, shallow} from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import App from './App';
import React from 'react';
import { act } from "react-dom/test-utils";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import * as login from './components/login/Login';
import Login from './components/login/Login';
import Footer from './components/footer/Footer';




describe('App testing without being authenticated', ()=> {

  let wrapper;
  beforeEach(()=>{
      wrapper = shallow(<App />);
  })



  it('renders without crashing', () =>{
    console.log(wrapper.debug());
    expect(wrapper).not.toBeNull();
  });
  
  it('renders 2 <Route /> components when no token', () => {
    expect(wrapper.find(Route).length).toBe(2);
  })

  it('renders <Login /> when no token', ()=>{
    expect(wrapper.find(Login).length).toBe(1);
  })

  it('renders the navigation bar', () => {
    const wrapper = mount(<App />);
    const navBar = 'Home';
    expect(wrapper.contains(navBar)).toEqual(true);
  })

  
  it('renders the footer', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Footer).length).toEqual(1);
  })

})

/*
describe('App testing while authenticated', ()=> {

  it('doesn\'t render <Login /> when token ', async()=>{
      global.fetch = jest.fn().mockResolvedValue({
    status: 200,
    ok: true,
    json: () => Promise.resolve({ userID : 'aaa', Token:'token }),

  });
    let mockToken = "token";
    jest.mock('./components/utils/useToken', () => {
      return jest.fn(() => ({
        token: mockToken
      }))
    })
    const {debug} = render(<App />);
    //console.log(wrapper.debug());
    debug()
    //expect(getByText('Vote'));
    
  })

})
*/

