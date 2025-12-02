import PortalMenu from "./portalMenu"
import { useTranslation } from "react-i18next"
function IdiomaMenuContent(){
         const {t, i18n} = useTranslation();
    return(
        <PortalMenu>
            <div className="flex">
                <h1>{t('titleIdioma')}</h1>
            </div>
            <hr/>
            <div className="idiomaFlex"> 
            <button onClick={() => i18n.changeLanguage("en")} className="Btn">{t('ingles')}</button>
            <button onClick={() => i18n.changeLanguage("pt")}className="Btn">{t('portugues')}</button>
            </div>
        </PortalMenu>
    )
}
export default IdiomaMenuContent