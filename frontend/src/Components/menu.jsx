import { useTranslation } from "react-i18next"
import "../menu.css"
import { Link } from "react-router"
function Menu(){
    const {t} = useTranslation();
    return <div className="barraMenu">
            <h1 className="menu">Menu</h1>
            <nav className="iconsMenu">
                <Link to="/passes" ><img src="icons/passe.svg"/>Passes</Link>
                <Link to="/pedidos" ><img src="icons/pedidos.svg"/>{t('pedidos')}</Link>
                <Link to="/movimentos" ><img src="icons/movimentos.svg"/>{t('movimentos')}</Link>
                <Link to="/perfil" ><img src="icons/User.svg"/>{t('perfil')}</Link>
                <Link to="/horarios" ><img src="icons/horários.svg"/>{t('horarios')}</Link>
                <Link to="/localizarTransporte" ><img src="icons/localizar.svg"/>{t('transportes')}</Link>
            <div className="barra"></div>
                <Link to="/definicoes" className="definicoes"><img src="icons/settings.svg" />{t('settings')}</Link>
                <Link to="/iniciar"className="terminarSessao"><img src="icons/logout.svg" />{t('logout')}</Link>
            </nav>
        </div> 
}
export default Menu