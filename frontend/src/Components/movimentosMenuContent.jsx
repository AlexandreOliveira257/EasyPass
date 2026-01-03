import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useUser } from "../Contexts/UserContext";
import "../Movimentos.css"
function MovimentosMenuContent(){
    const {t} = useTranslation()
    const {movimentos} = useUser()
    return(
    <PortalMenu>
        <h1>{t('movimentos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        {movimentos.length >= 1 ? (
  movimentos.map((el) => (
    <div className="movimentos-container" key={el.id}>
      <div className="movimentos-row">
        <div className="descricao">{el.descricao}</div>
        <div className="tipo">{el.nome_tipo}</div>
        <div className="data">{el.data_hora}</div>
        <div className="valor">{el.valor}</div>
        <div className="saldo-anterior">{el.saldo_anterior}</div>
        <div className="saldo-posterior">{el.saldo_posterior}</div>
      </div>
    </div>
  ))
        ) : ( <p>Não existem movimentos</p> )}
    </PortalMenu>
    )
}
export default MovimentosMenuContent