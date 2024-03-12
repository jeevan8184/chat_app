
import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import {BrowserRouter} from 'react-router-dom';

import rootReducer from './reducers/index';
import {Provider} from 'react-redux';
import{configureStore} from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk';

const store=configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

const root=ReactDOM.createRoot(document.getElementById('root'));

root.render (
    <React.StrictMode>
       <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>
       </BrowserRouter>
    </React.StrictMode>
)
