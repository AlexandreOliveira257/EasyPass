function EscolherPasseAutocarro({setView}){
return(
    <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("verificarDadosAutocarro")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">Escolha o passe que pretende criar</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarPasseUrbano")} src="tejoButton.svg"/><figcaption>Passe Urbano</figcaption></figure>
        <figure><img onClick={()=>setView("verificarPasseJovem")} src="tejoButton.svg"/><figcaption>Passe Jovem</figcaption></figure>
        </div>
    </div>
)
} export default EscolherPasseAutocarro