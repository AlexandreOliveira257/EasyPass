import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu"
import "../Horarios.css"
import TabelaHorario from "./tabelaHorario"
function HorarioMenuContent(){
    const {t} = useTranslation()
    return (
    <PortalMenu>
        <h1>{t('horarios').toUpperCase()}</h1>
        <hr></hr>
        <div className="flex">
           <div class="search-box">
            <h3>PESQUISA DE HORÁRIOS <img src=""></img></h3>
            <select>
                <option selected disabled>SANTARÉM</option>
                <option></option>
            </select>
            <select>
                <option>AMIAIS DE BAIXO</option>
                <option>OUTRO LOCAL</option>
            </select>
            <button>PESQUISAR</button>
        </div>
        <TabelaHorario/>
        </div>
    </PortalMenu>
    )
}
export default HorarioMenuContent