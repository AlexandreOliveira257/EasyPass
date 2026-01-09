import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu"
import "../Horarios.css"
import TabelaHorario from "./tabelaHorario"
import { useEffect, useState } from "react";
import jsonp from "jsonp";
import { localidadesComHorarioSantarém } from "./localidadesSantarém.js";
import { toast, Zoom } from "react-toastify";


function HorarioMenuContent(){
  
  const {t} = useTranslation() //Isto serve para adicionar a tradução
  const [localidades, setLocalidades] = useState([]);
  const [origem,setOrigem] = useState("");
  const [destino,setDestino] = useState("");
  const [origemFinal, setOrigemFinal] = useState("");
  const [destinoFinal, setDestinoFinal] = useState("");
  const notifyError = () =>
  toast.error("Tem de escolher uma origem e um destino!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
  //Uso fruto da API da RODOTEJO
  useEffect(() => {

    const url = "https://rtejo-search-engine.bitcliq.com/JsonHandler.ashx?t=o&s=rt";
    jsonp(url, { name: "callback"}, (err, data) => {
      if(err){
        console.error("Erro ao buscar localidades:", err);
      return;
    } else {
        setLocalidades(data); //recebe um array que contem Code: 1234, Description: "NomeLocal"
            const localidadesFiltradas = localidades.filter(el =>
             localidadesComHorarioSantarém.includes(
              el.Description.toUpperCase()
      )
);
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

  {localidades
    .filter(el =>
      localidadesComHorarioSantarém.includes(
        el.Description.toUpperCase()
      )
    )
    .map(el => (
      <option key={el.Code} value={el.Code}>
        {el.Description}
      </option>
    ))}
</select>

            <select onChange={e => setDestino(e.target.value)} className="estacao">
  <option selected disabled>Escolha um Destino!</option>

  {localidades
    .filter(el =>
      localidadesComHorarioSantarém.includes(
        el.Description.toUpperCase()
      )
    )
    .map(el => (
      <option key={el.Code} value={el.Code}>
        {el.Description}
      </option>
    ))}
</select>

            <button  onClick={()=>{
              setDestinoFinal(destino)
              setOrigemFinal(origem)
               if (!origem || !destino){
            notifyError()
            return;
          }
            }}className="pesquisarBtn">{t('pesquisa').toUpperCase()}</button>
        </div>
        <TabelaHorario origem={origemFinal} destino={destinoFinal} />
        
        </div>
        
    </PortalMenu>
    )
    
}
export default HorarioMenuContent

