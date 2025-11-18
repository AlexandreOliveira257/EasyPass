import Header from "../Components/header"
import PedidosMenuContent from "../Components/pedidosMenuContent"
import Menu from "../Components/menu"
function Pedidos(){
    return(
        <div>
            <Header/>
            <div className="flex">
            <Menu/>
            <PedidosMenuContent/>
            </div>
        </div>
    )
}
export default Pedidos