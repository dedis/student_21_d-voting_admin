import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';


Enzyme.configure({ adapter: new Adapter() });


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('');
  expect(linkElement).toBeInTheDocument();
});