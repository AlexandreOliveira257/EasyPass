import PortalMenu from "./portalMenu"
function IdiomaMenuContent(){
    return(
        <PortalMenu>
            <div className="flex">
                <h1>ALTERAR IDIOMA</h1>
            </div>
            <hr/>
            <div className="idiomaFlex"> 
            <button className="Btn">Inglês</button>
            <button className="Btn">Português</button>
            </div>
        </PortalMenu>
    )
}
export default IdiomaMenuContent