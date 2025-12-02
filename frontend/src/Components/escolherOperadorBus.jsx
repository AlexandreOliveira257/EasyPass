import { useTranslation } from "react-i18next"

function EscolherOperadorBus({setView}){
    const {t} = useTranslation()

    return(
        <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">{t('escolherOperadorPreferencia')}</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarDadosAutocarro")} src="tejoButton.svg"/><figcaption>Rodoviária Tejo</figcaption></figure>
        </div>
        </div>
    )
}
export default EscolherOperadorBus