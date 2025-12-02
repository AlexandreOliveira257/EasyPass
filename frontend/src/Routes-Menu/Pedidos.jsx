import Header from "../Components/header"
import Menu from "../Components/menu"
import PedidosMenuContent from "../Components/pedidosMenuContent"

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