import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useState } from "react";
import { Link } from "react-router";
import { useUser } from "../Contexts/UserContext";
function PortalMenuContent(){
    const {t} = useTranslation()
    const [showNotifications, setShowNotifications] = useState(false);
    const {username, passes, notifications} = useUser();
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
        <div className="idiomaFlex">
            {passes.length >= 1 ? (
                passes.map((el) =>(
                    <div>
                <span>{el.id_passe}</span>
                <span>{el.data_emissao}</span>
                <span>{el.data_validade}</span>
                <span>{el.estado_passe_descricao}</span>
                <span>{el.nome_tipo}</span>
                <span>{el.preco}</span>
                <span>{el.saldo}</span>
                </div> ))
            ):(
             <></>
            )}
        <Link to="/criarpasse"><img className="criarPasse" src={t('criarpasse')}/></Link>
        </div>
        
        </>
        )}
        {showNotifications && (
            <>
            <div className="flex">
            <h1>Notificações</h1>
            <img className="goBackBtn" src="icons/goBackBtn.svg" onClick={() => setShowNotifications(false)}/>
            </div>
            <hr></hr>
            {notifications.map((el)=>(
                <div>
                    {el}
                </div>
            ))}
            </>
      )}
    </PortalMenu>
}

export default PortalMenuContent