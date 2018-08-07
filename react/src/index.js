import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './layout.js';
import { commander } from './command.js';

ReactDOM.render(<Layout />, document.getElementById('index'));

window.addEventListener('message', commander.receive);
