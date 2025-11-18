import React from "react"
import "../App.css"
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import PortalPage from "./PortalPage"
import Pedidos from "../Routes-Menu/Pedidos";
import Iniciar from "./Iniciar";

function App(){
    return(
        <div className="bgImg">
            <Routes>
                <Route path="/" element={<PortalPage/>}/>
                <Route path="/passes" element={<PortalPage/>}/>
                <Route path="/pedidos" element={<Pedidos/>}/>
                <Route path="/Iniciar" element={<Iniciar/>}/>
            </Routes>
        </div>
    )
}
export default App