import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useUser } from "../Contexts/UserContext"
import "../Pedidos.css"
function PedidosMenuContent(){
  const {pedidos} = useUser();
  const {t} = useTranslation()
  console.log(pedidos)
    return(
      <PortalMenu>
        <h1>{t('pedidos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        {pedidos.length >= 1 ? (
          pedidos.map((el) => (
            <div className="pedido-container">
              <div className="pedido-image-container">
                <img src="EasyPass.png"></img>
              </div>
            <div className="pedido-container-mensagem">
            <span>{el.mensagem}</span>
            <span>{el.data_emissao}</span>
            <span>{el.estado_pedido_descricao}</span>
            </div>
            </div>
          ))
        ) : ( <p>Não existem pedidos</p> )}
      </PortalMenu>
    )
}
export default PedidosMenuContent