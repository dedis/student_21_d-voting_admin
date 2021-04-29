import React from 'react';
import { shallow } from 'enzyme';
import About from '../About';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {LanguageContext} from '../language/LanguageContext'
import  render from '@testing-library/react';
import renderer from 'react-test-renderer';
import {Translations} from '../language/Translations';
import ShallowRenderer from 'react-test-renderer/shallow';

Enzyme.configure({ adapter: new Adapter() });

/*
test('render', ()=>{
    render(<LanguageContext.Provider value = {['en',]}><About></About></LanguageContext.Provider>);
    expect(screen.getByText("")).toHaveTextContent('This website hosts');
});


it('renders correctly', ()=>{
    const tree = renderer.create(
        <LanguageContext.Provider value = {['en',]}>
            <About />
        </LanguageContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
})

*/



describe('About', () => {
  it('should render the About Component correctly in English', () => {  
      const component = renderer.create(<LanguageContext.Provider value = {['en',]}><About /></LanguageContext.Provider>);
      let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  });

  it('About component renders its text', () => {  
    const component = renderer.create(<LanguageContext.Provider value = {['en',]}><About /></LanguageContext.Provider>);
    expect(component.root.findByProps({className: "about-text"}).children);
});


});
