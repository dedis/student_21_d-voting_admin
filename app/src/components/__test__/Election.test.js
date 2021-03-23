import React from 'react';
import ReactDOM from 'react-dom';
import Election from '../election-status/Election';
import renderButton from '../election-status/Election';

import {render} from '@testing-library/react';

it("renders without crashing", ()=> {
    const div = document.createElement("div");
    ReactDOM.render(<Election></Election>, div);
})
