import { useTranslation } from "react-i18next"

function EscolherPasseAutocarro({setView}){
const {t} = useTranslation()

return(
    <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("verificarDadosAutocarro")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">{t('escolherPassePretendeCriar')}</h3>
        <div className="criarPasseFlexImages">
        <figure><img onClick={()=>setView("verificarPasseUrbano")} src="tejoButton.svg"/><figcaption>{t('passeUrbano')}</figcaption></figure>
        <figure><img onClick={()=>setView("verificarPasseJovem")} src="tejoButton.svg"/><figcaption>{t('passeJovem')}</figcaption></figure>
        </div>
    </div>
)
} export default EscolherPasseAutocarro