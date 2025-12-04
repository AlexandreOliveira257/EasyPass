import PortalMenu from "./portalMenu"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"
import "./idiomaMenuContent.css"

function IdiomaMenuContent(){
         const {t, i18n} = useTranslation();
    return(
        <PortalMenu>
            <div className="flex">
                <h1>{t('titleIdioma')}</h1>

                <span></span><Link to="/definicoes"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
            </div>

            <div className="hrPortal"></div>

            <div className="idiomaFlex"> 
            <button onClick={() => i18n.changeLanguage("en")} className="Btn">{t('ingles')}</button>
            <button onClick={() => i18n.changeLanguage("pt")}className="Btn">{t('portugues')}</button>
            </div>
        </PortalMenu>
    )
}
export default IdiomaMenuContent