import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
function DefinicoesMenuContent(){
    const {t} = useTranslation(); 
    return(
            <PortalMenu>
                <div className="flex">
                    <h1>{t('settings').toUpperCase()}</h1>
                    <img className="goBackBtn" src="icons/goBackBtn.svg"/>
                </div>
                <hr></hr>
                <div>
                <div className="alignButtons">
                <Link className="Btn" to="/idiomas">
                <img className="iconArrow" src="icons/icon.svg"/> {t('titleIdioma')}
                </Link>
                <Link className="Btn" to="/sobre">
                <img className="iconArrow" src="icons/icon.svg"/> {t('sobre')}
                </Link>
                </div>
                </div>
            </PortalMenu>
    )
}
export default DefinicoesMenuContent