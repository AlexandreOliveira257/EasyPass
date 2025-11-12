import PortalMenu from "./portalMenu";

function portalMenuContent(){
     return <PortalMenu>
        <div className="flex">
        <h1>Bem-vindo, [nome]</h1>
        <nav className="navPortal">
            <a className="btnPortal">Notificações</a>
            <a className="btnPortal">Gerir Passes</a>
        </nav>
        </div>
        <hr className="hrPortal"/>
    </PortalMenu>
}

export default portalMenuContent