import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import axios from 'axios';

axios.defaults.baseURL = "http://localhost/pasapasi/api";
axios.defaults.withCredentials = true;



const app = (
        <BrowserRouter>
            <App />
        </BrowserRouter>
);

ReactDOM.render( app, document.getElementById( 'root' ) );
// registerServiceWorker();
