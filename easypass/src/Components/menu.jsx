import "../menu.css"
function Menu(){
    return <div className="barraMenu">
            <h1>Menu</h1>
            <nav className="iconsMenu">
                <a href="#"><img src="icons/passe.svg" alt="Passes" />Passes</a>
                <a href="#"><img src="icons/pedidos.svg" alt="Passes" />Pedidos</a>
                <a href="#"><img src="icons/movimentos.svg" alt="Passes" />Movimentos</a>
                <a href="#"><img src="icons/user.svg" alt="Passes" />Perfil</a>
                <a href="#"><img src="icons/horários.svg" alt="Passes" />Horários</a>
                <a href="#"><img src="icons/localizar.svg" alt="Passes" />Localizar Transporte</a>
            <div className="barra"></div>
                <a href="#" className="definicoes"><img src="icons/settings.svg" alt="Passes" />Definições</a>
                <a href="#" className="terminarSessao"><img src="icons/logout.svg" alt="Passes" />Terminar Sessão</a>
            </nav>
        </div> 
}
export default Menu