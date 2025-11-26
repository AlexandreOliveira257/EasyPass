import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

function PasseAutocarroFinal(){
    const {t} = useTranslation()

    return(
        <div>
        <div className="flex">
        <span></span><Link to="/"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
        </div>
        <h3 className="criarPasseh3">{t('passeCriadoSucesso')}</h3>
        <div className="criarPasseFlexImages">
        <img className="passeAuto" src="passeAuto.svg"/>
        </div>
        </div>
    )
} export default PasseAutocarroFinal