import { useState } from "react";
import { useTranslation } from "react-i18next"

function VerificarDadosComboio({setView}){
    const [activeTab, setActiveTab] = useState(0);
    const {t} = useTranslation()

    return(
        <>
        <div className="formPerfil">
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        {/* FOTO */}
        <div>
          <h1>{t('verificarDados').toUpperCase()}</h1>
        </div>
          <div className="form">
            <label>{t('nomeCompleto')}</label>
            <input type="text" defaultValue="Luís José António" />

            <label>{t('genero')}</label>
            <select>
              <option>{t('masculino')}</option>
              <option>{t('feminino')}</option>
              <option>{t('generoOutro')}</option>
            </select>

            <label>{t('nacionalidade')}</label>
            <select>
              <option>{t('portuguesa')}</option>
            </select>

            <label>{t('nif')}</label>
            <input type="text" defaultValue="235666789" />

            <label>{t('dataNascimento')}</label>
            <div className="row">
              <select>
                <option>01</option>
              </select>
              <select>
                <option>05</option>
              </select>
              <select>
                <option>1986</option>
              </select>
            </div>
            <button onClick={()=>setView("escolherPasseComboio")} className="save-btn">{t('guardar').toUpperCase()}</button>
          </div>
      </div>
      </>
    )
} export default VerificarDadosComboio