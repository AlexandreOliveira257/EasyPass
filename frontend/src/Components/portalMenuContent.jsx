import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useState } from "react";
import { Link } from "react-router";
import { useUser } from "../Contexts/UserContext";
function PortalMenuContent(){
    const {t} = useTranslation()
      const [showNotifications, setShowNotifications] = useState(false);
    const {username} = useUser();
     return  <PortalMenu>
        {!showNotifications && (
            <>
        <div className="flex">
        <h1>{t('welcome')} {username}</h1>
        <nav className="navPortal">
            <div className="flex">
            <a onClick={() => setShowNotifications(!showNotifications)} className="btnPortal">{t('notificacoes')}</a><img src="icons/notifications.svg"/>
            </div>
            <div className="flex">
            <a className="btnPortal">{t('gerirPasses')}</a><img src={"icons/gerirPasses.svg"}/>
            </div>
        </nav>
        </div>
        <div className="hrPortal"></div>
        <h2 className="osSeusPasses">{t('seusPasses')}</h2>
        <Link to="/criarpasse"><img className="criarPasse" src={t('criarpasse')}/></Link>
        </>
        )}
        {showNotifications && (
            <>
            <div className="flex">
            <h1>Notificações</h1>
            <img className="goBackBtn" src="icons/goBackBtn.svg" onClick={() => setShowNotifications(false)}/>
            </div>
            <hr></hr>
            </>
      )}
    </PortalMenu>
}

export default PortalMenuContent