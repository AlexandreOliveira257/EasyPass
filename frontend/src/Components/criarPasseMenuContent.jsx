import { Link } from "react-router"
import { useState } from "react";
import { useTranslation } from "react-i18next"
import EscolherOperadorBus from "./escolherOperadorBus";
import EscolherOperadorTrain from "./escolherOperadorTrain";
import EscolherPasseComboio from "./escolherPasseComboio";
import EscolherPasseAutocarro from "./escolherPasseAutocarro";
import VerificarPasseVerde from "./PagamentoPasseVerde";
import VerificarPasseUrbano from "./PagamentoPasseUrbano";
import VerificarPasseJovem from "./PagamentoPasseJovem";


function CriarPasseMenuContent(){
const [view, setView] = useState("none");   
const {t} = useTranslation()

    return( 
        <div>
        {view === "none" && (
        <>
        <div className="flex">
            <span></span><Link to="/passes"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
        </div>
        <h3 className="criarPasseh3">{t('escolhaMeioTransporte')}</h3>
        <div className="criarPasseFlexImages">
            <figure><img src="BoatOption.svg"/><figcaption className="disabled">{t('barco')}</figcaption></figure>
            <figure><img onClick={()=>setView("escolherOperadorBus")} src="BusOption1.svg"/><figcaption>{t('autocarro')}</figcaption></figure>
            <figure><img onClick={()=>setView("escolherOperadorTrain")} src="TrainOption1.svg"/><figcaption>{t('comboio')}</figcaption></figure>
            <figure><img src="MetroOption.svg"/><figcaption className="disabled">{t('metro')}</figcaption></figure>
        </div>
        </>
        )}
        
        {view === "escolherOperadorBus" && <EscolherOperadorBus setView={setView}/>} 
        {view === "escolherOperadorTrain" && <EscolherOperadorTrain setView={setView}/>} 
        {view === "escolherPasseAutocarro" && <EscolherPasseAutocarro setView={setView}/>}
        {view === "escolherPasseComboio" && <EscolherPasseComboio setView={setView}/>}
        {view === "verificarPasseVerde" && <VerificarPasseVerde setView={setView}/>}
        {view === "verificarPasseUrbano" && <VerificarPasseUrbano setView={setView}/>}
        {view === "verificarPasseJovem" && <VerificarPasseJovem setView={setView}/>}


        </div>
    )
}
export default CriarPasseMenuContent