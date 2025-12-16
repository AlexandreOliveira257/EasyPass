import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App'
import Iniciar from './Pages/Iniciar';
import { HashRouter } from "react-router-dom";
import  './i18n';
import { UserProvider } from './Contexts/UserContext';

ReactDOM.createRoot(document.querySelector("#root")).render(
        <HashRouter>
            <UserProvider>
            <App />
            </UserProvider>
        </HashRouter>
);