import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu"
import "../Horarios.css"
import TabelaHorario from "./tabelaHorario"
import { useEffect, useState } from "react";
import jsonp from "jsonp";


function HorarioMenuContent(){
  const {t} = useTranslation() //Isto serve para adicionar a tradução
  const [localidades, setLocalidades] = useState([]);
  const [origem,setOrigem] = useState("0404");
  const [destino,setDestino] = useState("0406");
  const [origemFinal, setOrigemFinal] = useState("");
  const [destinoFinal, setDestinoFinal] = useState("");
  //Uso fruto da API da RODOTEJO
  useEffect(() => {
    const url = "https://rtejo-search-engine.bitcliq.com/JsonHandler.ashx?t=o&s=rt";
    jsonp(url, { name: "callback"}, (err, data) => {
      if(err){
        console.error("Erro ao buscar localidades:", err);
      return;
    } else {
        setLocalidades(data); //recebe um array que contem Code: 1234, Description: "NomeLocal"
    }
    });
  }, []);
  
    return (
    <PortalMenu>
        <h1>{t('horarios').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        <div className="flex">
           <div className="search-box">
            <h3>{t('pesquisaHorarios').toUpperCase()}</h3>

            <select onChange={e => setOrigem(e.target.value)} className="estacao">
            <option selected disabled>Escolha uma Origem!</option>
            {localidades.map((el) => (
              <option  key={el.Code} value={el.Code}>
                {el.Description}
              </option>
            ))}
            </select>
            <select onChange={e => setDestino(e.target.value)} className="estacao">
              <option selected disabled>Escolha um Destino!</option>
                {localidades.map((el) => (
              <option  key={el.Code} value={el.Code}>
                {el.Description}  
              </option>
            ))}
            </select>
            <button  onClick={()=>{
              setDestinoFinal(destino)
              setOrigemFinal(origem)
              console.log(origem,destino)
            }}className="pesquisarBtn">{t('pesquisa').toUpperCase()}</button>
        </div>
        <TabelaHorario origem={origemFinal} destino={destinoFinal} />
        
        </div>
        
    </PortalMenu>
    )
    
}
export default HorarioMenuContent

