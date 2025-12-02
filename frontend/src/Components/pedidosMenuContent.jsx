import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"

function PedidosMenuContent(){
  const {t} = useTranslation()
    return(
      <PortalMenu>
        <h1>{t('pedidos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
      </PortalMenu>
    )
}
export default PedidosMenuContent