import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import renderer from 'react-test-renderer';




test('renders learn react link', () => {
  //const mock = jest.fn();
  //let result = mock('en');
  //render(<App />);
  const component = renderer.create(<App />);

});