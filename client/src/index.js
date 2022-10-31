import React, {createContext} from 'react';
import {BrowserRouter} from 'react-router-dom';
import ReactDOM from 'react-dom/client';

import UserStore from './storage/userStorage';
import App from './app';

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Context.Provider value={{user: new UserStore()}}>
                <App />
            </Context.Provider>
        </BrowserRouter>
    </React.StrictMode>
);