import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
function PedidosMenuContent(){
    return(
      <PortalMenu>
        <div className="flex">
        <h1>PEDIDOS</h1>
        <Link to="/passes"><img className="goBackBtn" src="icons/goBackBtn.svg"></img></Link>
        </div>
        <hr></hr>
      </PortalMenu>
    )
}
export default PedidosMenuContent