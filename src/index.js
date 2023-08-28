import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css';
import {Provider} from './context/context';
import {SpeechProvider} from '@speechly/react-client';
console.log("pass10");
ReactDOM.render(
    <SpeechProvider appId="4779e097-324f-4c35-8595-1025f1f6425c">
        <Provider>
            <App />
        </Provider>
    </SpeechProvider>,
document.getElementById('root'));