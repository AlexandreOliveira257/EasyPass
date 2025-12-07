import { useTranslation } from "react-i18next"

function VerificarPasseJovem({setView}){
    const {t} = useTranslation()

    return(
        <div className="formPerfil">
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <div className="photo-area">
          <h1>{t('verificarDados').toUpperCase}</h1>
        </div>

          <div className="form">
            <label>{t('nomeCompleto')}</label>
            <input type="text" defaultValue="Luís José António" />
            <label>{t('modalidade')}</label>
            <input disabled type="text" defaultValue="Passe Ferroviário Verde" />

            <label>{t('nif')}</label>
            <input type="text" defaultValue="235666789" />

            <label>{t('tipoDocumentoIdentificacao')}</label>
            <div className="doc-type">
              <label>
                {t('cartãoCidadao')} <input defaultChecked className="radio" type="radio" name="doc" /> 
              </label>
              <label>
                {t('cartaConducao')} <input className="radio" type="radio" name="doc"  /> 
              </label>
            </div>

            <label>{t('requerPasseFisico')}</label>
            <div className="doc-type">
              <label>
                {t('sim')} <input defaultChecked className="radio"type="radio" name="passeFisico" /> 
              </label>
              <label>
                {t('nao')} <input className="radio" type="radio" name="passeFisico"  /> 
              </label>
            </div>

            <button onClick={()=>setView("passeAutocarroFinal")} className="save-btn">{t('pagamento').toUpperCase()}</button>
          </div>
          </div>
    )
}export default VerificarPasseJovem