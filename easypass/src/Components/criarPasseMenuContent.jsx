import { Link } from "react-router"
import { useState } from "react";
import EscolherOperadorBus from "./escolherOperadorBus";
import EscolherOperadorTrain from "./escolherOperadorTrain";
import EscolherPasseComboio from "./escolherPasseComboio";
import EscolherPasseAutocarro from "./escolherPasseAutocarro";
import VerificarDadosComboio from "./verificarDadosComboio";
import VerificarDadosAutocarro from "./verificarDadosAutocarro";
import VerificarPasseVerde from "./verificarPasseVerde";
import VerificarPasseUrbano from "./verificarPasseUrbano";
import VerificarPasseJovem from "./verificarPasseJovem";
import PasseAutocarroFinal from "./passeAutocarroFinal";
import PasseComboioFinal from "./passeComboioFinal";

function CriarPasseMenuContent(){
const [view, setView] = useState("none");   
    return(
        
        <div>
      
        {view === "none" && (
        <>
        <div className="flex">
        <span></span><Link to="/"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
        </div>
        <h3 className="criarPasseh3">Escolha o meio de transporte</h3>
        <div className="criarPasseFlexImages">
        <figure><img src="BoatOption.svg"/><figcaption className="disabled">Barco</figcaption></figure>
        <figure><img onClick={()=>setView("escolherOperadorBus")} src="BusOption1.svg"/><figcaption>Autocarro</figcaption></figure>
        <figure><img onClick={()=>setView("escolherOperadorTrain")} src="TrainOption1.svg"/><figcaption>Comboio</figcaption></figure>
        <figure><img src="MetroOption.svg"/><figcaption className="disabled">Metro</figcaption></figure>
        </div>
        </>
        )}
        
        {view === "escolherOperadorBus" && <EscolherOperadorBus setView={setView}/>} 
        {view === "escolherOperadorTrain" && <EscolherOperadorTrain view={view} setView={setView}/>} 
        {view === "verificarDadosAutocarro" && <VerificarDadosAutocarro setView={setView}/>}
        {view === "verificarDadosComboio" && <VerificarDadosComboio setView={setView}/>}
        {view === "escolherPasseAutocarro" && <EscolherPasseAutocarro setView={setView}/>}
        {view === "escolherPasseComboio" && <EscolherPasseComboio setView={setView}/>}
        {view === "verificarPasseVerde" && <VerificarPasseVerde setView={setView}/>}
        {view === "verificarPasseUrbano" && <VerificarPasseUrbano setView={setView}/>}
        {view === "verificarPasseJovem" && <VerificarPasseJovem setView={setView}/>}
        {view === "passeAutocarroFinal" && <PasseAutocarroFinal setView={setView}/>}
        {view === "passeComboioFinal" && <PasseComboioFinal setView={setView}/>}


        </div>
    )
}
export default CriarPasseMenuContent