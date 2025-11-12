import "../menu.css"
function Menu(){
    return <div className="barraMenu">
            <h1 className="menu">Menu</h1>
            <nav className="iconsMenu">
                <a href="#"><img src="icons/passe.svg"/>Passes</a>
                <a href="#"><img src="icons/pedidos.svg"/>Pedidos</a>
                <a href="#"><img src="icons/movimentos.svg"/>Movimentos</a>
                <a href="#"><img src="icons/User.svg"/>Perfil</a>
                <a href="#"><img src="icons/horários.svg"/>Horários</a>
                <a href="#"><img src="icons/localizar.svg"/>Localizar Transporte</a>
            <div className="barra"></div>
                <a href="#" className="definicoes"><img src="icons/settings.svg" />Definições</a>
                <a href="#" className="terminarSessao"><img src="icons/logout.svg" />Terminar Sessão</a>
            </nav>
        </div> 
}
export default Menu