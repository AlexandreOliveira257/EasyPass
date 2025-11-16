import "../menu.css"
import { Link } from "react-router"
function Menu(){
    return <div className="barraMenu">
            <h1 className="menu">Menu</h1>
            <nav className="iconsMenu">
                <Link to="/passes" ><img src="icons/passe.svg"/>Passes</Link>
                <Link to="/pedidos" ><img src="icons/pedidos.svg"/>Pedidos</Link>
                <Link to="/movimentos" ><img src="icons/movimentos.svg"/>Movimentos</Link>
                <Link to="/perfil" ><img src="icons/User.svg"/>Perfil</Link>
                <Link to="/horarios" ><img src="icons/horários.svg"/>Horários</Link>
                <Link to="/transportes" ><img src="icons/localizar.svg"/>Localizar Transporte</Link>
            <div className="barra"></div>
                <Link to="/definicoes" className="definicoes"><img src="icons/settings.svg" />Definições</Link>
                <Link to="terminarSessao"className="terminarSessao"><img src="icons/logout.svg" />Terminar Sessão</Link>
            </nav>
        </div> 
}
export default Menu