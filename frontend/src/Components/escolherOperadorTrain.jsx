import { useTranslation } from "react-i18next"

function EscolherOperadorTrain({setView, view}){
    const {t} = useTranslation()

    return (
        <div>
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <h3 className="criarPasseh3">{t('escolherOperadorPreferencia')}</h3>
        <div className="criarPasseFlexImages">
        <figure id="transporteBtn"><img onClick={()=>setView("escolherPasseComboio")} src="cpButton.svg"/>
        <figcaption>Comboios De Portugal</figcaption></figure>
        </div>

        </div>
        
    )
} export default EscolherOperadorTrain