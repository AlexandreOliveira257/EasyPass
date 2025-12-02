import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App'
import Iniciar from './Pages/Iniciar';
import { HashRouter } from "react-router-dom";
import  './i18n';

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);