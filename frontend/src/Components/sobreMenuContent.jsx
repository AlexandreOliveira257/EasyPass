import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"

function SobreMenuContent(){
    const {t} = useTranslation(); 
    return(
            <PortalMenu>
                <div className="flex">
                    <h1>{t('sobre').toUpperCase()}</h1>

                    <span></span><Link to="/definicoes"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
                </div>

                <div className="hrPortal"></div>
                
                <div>
                <div className="alignButtons">

                <Link className="Btn">
                <img className="iconArrow" src="icons/icon.svg"/>
                {t('termosECondicoes')}
                </Link>

                <Link className="Btn">
                <img className="iconArrow" src="icons/icon.svg"/>
                {t('politicaPrivacidade')}
                </Link>

                <Link className="Btn">
                <img className="iconArrow" src="icons/icon.svg"/>
                {t('acessibilidade')}
                </Link>

                </div>
                </div>
            </PortalMenu>
    )
}
export default SobreMenuContent