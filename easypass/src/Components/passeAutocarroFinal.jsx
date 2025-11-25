import { Link } from "react-router-dom"
function PasseAutocarroFinal(){
    return(
        <div>
        <div className="flex">
        <span></span><Link to="/"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
        </div>
        <h3 className="criarPasseh3">Passe criado com sucesso!</h3>
        <div className="criarPasseFlexImages">
        <img className="passeAuto" src="passeAuto.svg"/>
        </div>
        </div>
    )
} export default PasseAutocarroFinal