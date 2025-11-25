function EscolherPasseComboio({setView}){
return(
    <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("verificarDadosComboio")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">Escolha o passe que pretende criar</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarPasseVerde")} src="pVerde.svg"/><figcaption>Passe Ferroviário Verde</figcaption></figure>
        </div>
    </div>
)
} export default EscolherPasseComboio