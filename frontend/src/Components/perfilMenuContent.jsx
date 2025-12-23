import { useState } from "react";
import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu";
import "../Perfil.css"
import { useUser } from "../Contexts/UserContext";

function PerfilMenuContent() {
  const [activeTab, setActiveTab] = useState(0);
  const {t} = useTranslation()
  const {username, nif} = useUser()

  return (
    <PortalMenu>
      <div className="formPerfil">
        {/* FOTO */}
        <div className="photo-area">
          <div className="circle-photo"></div>
          <button className="btn-photo">{t('alterarFoto').toUpperCase()}</button>
        </div>
        {/* TABS */}
        <div className="tabs">
          <div
            className={`tab ${activeTab === 0 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            {t('dadosPessoais')}
          </div>

          <div
            className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            {t('morada')}
          </div>

          <div
            className={`tab ${activeTab === 2 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            {t('contactos')}
          </div>
        </div>

        

        {/* TAB 0 - DADOS PESSOAIS */}
        {activeTab === 0 && (
          <div className="form">
            <label>{t('nomeCompleto')}</label>
            <input type="text" defaultValue={username} />

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
            <input type="text" defaultValue={nif} />

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

            <label>{t('tipoDocumentoIdentificacao')}</label>
            <div className="doc-type">
              <label>
                {t('cartãoCidadao')} <input className="radio"type="radio" name="doc" /> 
              </label>

              <label>
                {t('cartaConducao')} <input className="radio"type="radio" name="doc" defaultChecked /> 
              </label>
            </div>

            <label>{t('numeroDocumentoIdentificacao')}</label>
            <input type="text" />

            <label>{t('validadeDocumentoIdentificacao')}</label>
            <div className="row">
              <select>
                <option>17</option>
              </select>
              <select>
                <option>03</option>
              </select>
              <select>
                <option>2027</option>
              </select>
            </div>

            <button className="save-btn">{t('guardar').toUpperCase()}</button>
          </div>
        )}

        {/* TAB 1 - MORADA */}
        {activeTab === 1 && (
          <div className="form">
            <label>{t('morada')}</label>
            <input type="text" placeholder={t('aSuaMorada')} />
            <label>{t('codigoPostal')}</label>
            <input type="text" placeholder={t('oSeuCodigoPostal')} />
            <label>{t('localidade')}</label>
            <input type="text" placeholder={t('aSuaLocalidade')} />
            <label>{t('paisResidencia')}</label>
            <select>
              <option>Portugal</option>
              <option>Angola</option>
            </select>
          </div>
        )}

        {/* TAB 2 - CONTACTOS */}
        {activeTab === 2 && (
          <div className="form">
            <label>Email</label>
            <input type="text" placeholder={t('oSeuEmail')} />
            <label>{t('telemovel')}</label>
            <input type="text" placeholder={t('oSeuTelemovel')} />
            <label>{t('contactoPreferencial')}</label>
            <select>
              <option>Email</option>
              <option>{t('telemovel')}</option>
            </select>
          </div>
        )}

      </div>
    </PortalMenu>
  );
}

export default PerfilMenuContent;
