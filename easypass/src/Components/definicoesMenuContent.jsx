import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
function DefinicoesMenuContent(){
    return(
            <PortalMenu>
                <div className="flex">
                    <h1>DEFINIÇÕES</h1>
                    <img className="goBackBtn" src="icons/goBackBtn.svg"/>
                </div>
                <hr></hr>
                <div>
                <div className="alignButtons">
                <Link className="Btn" to="/idiomas">
                <img className="iconArrow" src="icons/icon.svg"/> ALTERAR IDIOMA
                </Link>
                <Link className="Btn" to="/sobre">
                <img className="iconArrow" src="icons/icon.svg"/> SOBRE
                </Link>
                </div>
                </div>
            </PortalMenu>
    )
}
export default DefinicoesMenuContent