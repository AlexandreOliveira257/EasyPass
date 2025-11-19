import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";

function PortalMenuContent(){
    const {t} = useTranslation()
     return  <PortalMenu>
        <div className="flex">
        <h1>{t('welcome')} [nome]</h1>
        <nav className="navPortal">
            <div className="flex">
            <a className="btnPortal">{t('notificacoes')}</a><img src="icons/notifications.svg"/>
            </div>
            <div className="flex">
            <a className="btnPortal">{t('gerirPasses')}</a><img src="icons/gerirPasses.svg"/>
            </div>
        </nav>
        </div>
        <div className="hrPortal"></div>
        <h2 className="osSeusPasses">{t('seusPasses')}</h2>
        <img className="criarPasse" src="criarPasse.svg"/>
    </PortalMenu>
}

export default PortalMenuContent