import { useState } from "react";
import PortalMenu from "./portalMenu";
import "../Perfil.css"
function PerfilMenuContent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PortalMenu>
      <div className="formPerfil">
        {/* FOTO */}
        <div className="photo-area">
          <div className="circle-photo"></div>
          <button className="btn-photo">ALTERAR FOTO</button>
        </div>
        {/* TABS */}
        <div className="tabs">
          <div
            className={`tab ${activeTab === 0 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(0)}
          >
            Dados Pessoais
          </div>

          <div
            className={`tab ${activeTab === 1 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(1)}
          >
            Morada
          </div>

          <div
            className={`tab ${activeTab === 2 ? "active-tab" : ""}`}
            onClick={() => setActiveTab(2)}
          >
            Contactos
          </div>
        </div>

        

        {/* TAB 0 - DADOS PESSOAIS */}
        {activeTab === 0 && (
          <div className="form">
            <label>Nome Completo</label>
            <input type="text" defaultValue="Luís José António" />

            <label>Género</label>
            <select>
              <option>Masculino</option>
              <option>Feminino</option>
            </select>

            <label>Nacionalidade</label>
            <select>
              <option>Portuguesa</option>
            </select>

            <label>NIF</label>
            <input type="text" defaultValue="235666789" />

            <label>Data de nascimento</label>
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

            <label>Tipo Documento Identificação</label>
            <div className="doc-type">
              <label>
                Cartão de cidadão <input className="radio"type="radio" name="doc" /> 
              </label>

              <label>
                Cartão de condução <input className="radio"type="radio" name="doc" defaultChecked /> 
              </label>
            </div>

            <label>Número Documento Identificação</label>
            <input type="text" />

            <label>Validade Documento Identificação</label>
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

            <button className="save-btn">GUARDAR</button>
          </div>
        )}

        {/* TAB 1 - MORADA */}
        {activeTab === 1 && (
          <div className="form">
            <label>Morada</label>
            <input type="text" placeholder="Escreva a sua morada" />
            <label>Código Postal</label>
            <input type="text" placeholder="Escreva o seu código postal" />
            <label>Localidade</label>
            <input type="text" placeholder="Escreva a sua localidade" />
            <label>País de residência</label>
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
            <input type="text" placeholder="Escreva o seu email" />
            <label>Telemóvel</label>
            <input type="text" placeholder="Escreva a sua telemóvel" />
            <label>Contato preferêncial</label>
            <select>
              <option>Email</option>
              <option>Telemóvel</option>
            </select>
          </div>
        )}

      </div>
    </PortalMenu>
  );
}

export default PerfilMenuContent;
