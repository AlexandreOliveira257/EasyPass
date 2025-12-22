import { useTranslation } from "react-i18next"

function VerificarPasseJovem({setView}){
    const {t} = useTranslation()

    return(
        <div className="formPerfil">
        <div className="flex">
        <div>
        <h1>{t('verificarPagamento').toUpperCase()}</h1>
        </div>
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
      

          <div className="form">
            <label>{t('nomeCompleto')}</label>
            <input type="text" defaultValue="Luís José António" />
            <label>{t('modalidade')}</label>
            <input disabled type="text" defaultValue="Passe Ferroviário Verde" />    

            <label>{t('requerPasseFisico')}</label>
            <div className="doc-type">
              <label>
                {t('sim')} <input defaultChecked className="radio"type="radio" name="passeFisico" /> 
              </label>
              <label>
                {t('nao')} <input className="radio" type="radio" name="passeFisico"  /> 
              </label>
            </div>
            <hr></hr>
            <p>{t('passeDigital')}: 5€</p>
            <p>{t('modalidade')}: 5€</p>
            <p>Total: 10€</p>
            <button onClick={()=>setView("passeAutocarroFinal")} className="save-btn">{t('pagamento').toUpperCase()}</button>
          </div>
          </div>
    )
}export default VerificarPasseJovem