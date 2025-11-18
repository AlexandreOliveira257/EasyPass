import PortalMenu from "./portalMenu";

function portalMenuContent(){
     return <PortalMenu>
        <div className="flex">
        <h1>Bem-vindo, [nome]</h1>
        <nav className="navPortal">
            <div className="flex">
            <a className="btnPortal">Notificações</a><img src="icons/notifications.svg"/>
            </div>
            <div className="flex">
            <a className="btnPortal">Gerir Passes</a><img src="icons/gerirPasses.svg"/>
            </div>
        </nav>
        </div>
        <div className="hrPortal"></div>
        <h2 className="osSeusPasses">Os seus passes</h2>
        <img className="criarPasse" src="criarPasse.svg"/>
    </PortalMenu>
}

export default portalMenuContent