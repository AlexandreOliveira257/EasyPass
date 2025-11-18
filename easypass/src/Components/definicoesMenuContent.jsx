import PortalMenu from "./portalMenu"
import "../buttons.css"
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
                <button className="btnIdioma"><img src="icons/icon.svg"/> ALTERAR IDIOMA</button>
                <button className="btnSobre"><img src="icons/icon.svg"/> SOBRE</button>
                </div>
                </div>
            </PortalMenu>
    )
}
export default DefinicoesMenuContent