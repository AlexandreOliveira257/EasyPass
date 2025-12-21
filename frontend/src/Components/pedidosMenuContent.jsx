import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useUser } from "../Contexts/UserContext"

function PedidosMenuContent(){
  const [showPedido,setShowPedido] = useState(false);
  const {pedidos} = useUser();
  const {t} = useTranslation()
  console.log(pedidos)
    return(
      <PortalMenu>
        <h1>{t('pedidos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        {pedidos.length >= 1 ? (
          pedidos.map((el) => (
            <div className="pedidoContainer">
            <img src="EasyPass.png" width={50}></img>
            <div className="align">
            <span>{el.mensagem}</span>
            <span>{el.estado_pedido_descricao}</span>
            <span>{el.data_emissao}</span>
            </div>
            </div>
          ))
        ) : ( <p>Sem Pedidos</p> )}
      </PortalMenu>
    )
}
export default PedidosMenuContent