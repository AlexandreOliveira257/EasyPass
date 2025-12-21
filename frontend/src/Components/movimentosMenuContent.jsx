import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useUser } from "../Contexts/UserContext";

function MovimentosMenuContent(){
    const {t} = useTranslation()
    const {movimentos} = useUser()
    return(
    <PortalMenu>
        <h1>{t('movimentos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        {movimentos.length >= 1 ? (
          movimentos.map((el) => (
            <div className="pedidoContainer">
            <div className="align">
            <span>{el.descricao}</span>
            <span>{el.nome_tipo}</span>
            <span>{el.data_hora}</span>
            <span>{el.valor}</span>
            <span>{el.saldo_anterior}</span>
            <span>{el.saldo_posterior}</span>
            </div>
            </div>
          ))
        ) : ( <p>Não existem movimentos</p> )}
    </PortalMenu>
    )
}
export default MovimentosMenuContent