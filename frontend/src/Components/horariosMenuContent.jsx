import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu"
import "../Horarios.css"
import TabelaHorario from "./tabelaHorario"

function HorarioMenuContent(){
    const {t} = useTranslation()
    return (
    <PortalMenu>
        <h1>{t('horarios').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        <div className="flex">
           <div class="search-box">
            <h3>{t('pesquisaHorarios').toUpperCase()} <img src=""></img></h3>
            <select className="estacao">
                <option selected disabled>SANTARÉM</option>
            </select>
            <select className="estacao">
                <option>AMIAIS DE BAIXO</option>
            </select>
            <button className="pesquisarBtn">{t('pesquisa').toUpperCase()}</button>
        </div>
        <TabelaHorario/>
        </div>
    </PortalMenu>
    )
}
export default HorarioMenuContent