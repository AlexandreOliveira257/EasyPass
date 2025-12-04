import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu"
import "../Horarios.css"
import TabelaHorario from "./tabelaHorario"
import { useEffect, useState } from "react";
import jsonp from "jsonp";


function HorarioMenuContent(){
  const {t} = useTranslation() //Isto serve para adicionar a tradução
  const [localidades, setLocalidades] = useState([]);
  //Uso fruto da API da RODOTEJO
  useEffect(() => {
    const url = "https://rtejo-search-engine.bitcliq.com/JsonHandler.ashx?t=o&s=rt";
    jsonp(url, { name: "callback" }, (err, data) => {
        setLocalidades(data); //recebe um array que contem Code: 1234, Description: ""
    });
  }, []);
  
    return (
    <PortalMenu>
        <h1>{t('horarios').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        <div className="flex">
           <div class="search-box">
            <h3>{t('pesquisaHorarios').toUpperCase()} <img src=""></img></h3>

            <select  className="estacao">
            {localidades.map((el) => (
              <option key={el.Code} value={el.Code}>
                {el.Description}
              </option>
            ))}
            </select>
            <select  className="estacao">
              <option selected disabled>Escolha um Destino!</option>
                {localidades.map((el) => (
              <option key={el.Code} value={el.Code}>
                {el.Description}
              </option>
            ))}
            </select>
            <button type="submit" className="pesquisarBtn">{t('pesquisa').toUpperCase()}</button>
        </div>
        <TabelaHorario/>
        </div>
    </PortalMenu>
    )
}
export default HorarioMenuContent