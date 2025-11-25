
function EscolherOperadorBus({setView}){
      
    return(
        <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">Escolha o operador de preferência</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarDadosAutocarro")} src="tejoButton.svg"/><figcaption>Rodoviária Tejo</figcaption></figure>
        </div>
        </div>
    )
}
export default EscolherOperadorBus