import "../App.css"
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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

function App(){
    return(
        <div className="bgImg">
            <Routes>
                <Route path="/" element={<Iniciar/>}/>
                <Route path="/passes" element={<PortalPage/>}/>
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
        </div>
    )
}
export default App