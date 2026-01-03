import "../App.css"
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PortalPage from "./PortalPage"
import Pedidos from "../Routes-Menu/Pedidos";
import Iniciar from "./Iniciar";
import Movimentos from "../Routes-Menu/Movimentos";
import Definicoes from "../Routes-Menu/Definicoes";
import Idiomas from "../Routes-Menu/Idiomas";
import Horarios from "../Routes-Menu/Horarios";
import Perfil from "../Routes-Menu/Perfil";
import CriarPasse from "../Routes-Menu/CriarPasse";
import LocalizarTransporte from "../Routes-Menu/Transportes";
import Sobre from "../Routes-Menu/Sobre";
import { useUser } from "../Contexts/UserContext"
import React, { useState, useEffect } from 'react';
import { ToastContainer, Bounce } from "react-toastify";
function App(){
    const {loading, user} = useUser();

    const isAuth = localStorage.getItem("isLoggedIn") === "true";

    return(
        // Loading Screen
        <div className="bgImg">
            {loading ? <div className="portal-loading">
                            <img alt="A Carregar" src="loading.gif"/>
                        </div> : <></>}
            <Routes>
                {/* If logged in, a página inicial redireciona para passes */}
                <Route path="/" element={isAuth ? <Navigate to="/passes"/> : <Iniciar />} />
                <Route path="/iniciar" element={isAuth ? <Navigate to="/passes"/> : <Iniciar />} />

                {/* Routes Protegidas */}
                <Route path="/passes" element={isAuth ? <PortalPage /> : <Navigate to="/iniciar" />} />
                <Route path="/perfil" element={isAuth ? <Perfil /> : <Navigate to="/iniciar" />} />

                {/* Outras Routes */}
                <Route path="/pedidos" element={<Pedidos/>}/>
                <Route path="/movimentos" element={<Movimentos/>}/>
                <Route path="/definicoes" element={<Definicoes/>}/>
                <Route path="/sobre" element={<Sobre/>}/>
                <Route path="/idiomas" element={<Idiomas/>}/>
                <Route path="/horarios" element={<Horarios/>}/>
                <Route path="/perfil" element={<Perfil/>}/>
                <Route path="/criarPasse" element={<CriarPasse/>}/>
                <Route path="/iniciar" element={<Iniciar/>}/>
                <Route path="/localizarTransporte" element={<LocalizarTransporte/>}/>
            </Routes>
            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}/>
        </div>
    )
}
export default App