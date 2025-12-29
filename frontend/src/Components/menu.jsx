import { useTranslation } from "react-i18next"
import "../menu.css"
import { Link, useNavigate} from "react-router-dom"
import { useUser } from "../Contexts/UserContext"
function Menu(){
    const {t} = useTranslation();
    const {username, setUsername, setPedidos, setMovimentos, email} = useUser();
    const navigate = useNavigate()
    async function NavigationHandler(route) {
        const url = "https://migale.antrob.eu/backend/PMP.php"
        try{
            const response = await fetch(url, {
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body: JSON.stringify({
                email: email
                })
        });
        const data = await response.json();
        console.log(data);
        if (data.informacao === "Pedidos e movimentos obtidos com sucesso!") {
            setPedidos(data.pedidos)
            setMovimentos(data.movimentos)
            navigate(route);
        }
        }catch(error){
            console.log("Ocorreu um erro:" + error)
        }
    }
    return <div className="barraMenu">
            <h1 className="menu">Menu</h1>
            <nav className="iconsMenu">
                <Link to="/passes" ><img src="icons/passe.svg"/>Passes</Link>
                <a onClick={()=>NavigationHandler("/pedidos")}><img src="icons/pedidos.svg"/>{t('pedidos')}</a>
                <Link to="/movimentos" ><img src="icons/movimentos.svg"/>{t('movimentos')}</Link>
                <Link to="/perfil" ><img src="icons/User.svg"/>{t('perfil')}</Link>
                <Link to="/horarios" ><img src="icons/horários.svg"/>{t('horarios')}</Link>
                <Link to="/localizarTransporte" ><img src="icons/localizar.svg"/>{t('transportes')}</Link>
            <div className="barra"></div>
                <Link to="/definicoes" className="definicoes"><img src="icons/settings.svg" />{t('settings')}</Link>
                <Link onClick={() => setUsername(undefined)} to="/iniciar" className="terminarSessao"><img src="icons/logout.svg" />{t('logout')}</Link>
            </nav>
        </div> 
}
export default Menu