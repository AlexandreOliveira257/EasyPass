import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App'
import './index.css'
import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.querySelector("#root")).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
);