
function EscolherOperadorTrain({setView, view}){
    return (
        <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">Escolha o operador de preferência</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarDadosComboio")} src="cpButton.svg"/><figcaption>Comboios De Portugal</figcaption></figure>
        </div>

        </div>
        
    )
} export default EscolherOperadorTrain