import { useTranslation } from "react-i18next"

function EscolherPasseComboio({setView}){
const {t} = useTranslation()

return(
    <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("verificarDadosComboio")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">{t('escolherPassePretendeCriar')}</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarPasseVerde")} src="pVerde.svg"/><figcaption>{t('passeFerroviarioVerde')}</figcaption></figure>
        </div>
    </div>
)
} export default EscolherPasseComboio