import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next"
import PortalMenu from "./portalMenu";
import "../Perfil.css"
import { useUser } from "../Contexts/UserContext";

function PerfilMenuContent() {
  const [activeTab, setActiveTab] = useState(0);
  const {t} = useTranslation()

  const { nomeCompleto, nif, email } = useUser();
  const dias = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
  const meses = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
  const anos = Array.from({ length: 2025 - 1950 + 1 }, (_, i) => 1950 + i).reverse();
  const anosValidade = Array.from({ length: 2040 - 2020 + 1 }, (_, i) => 2020 + i).reverse();

  const [formData, setFormData] = useState({
    // Dados pessoais
    nomeCompleto: nomeCompleto || "",
    genero: "1",
    nacionalidade: "Portuguesa",
    nif: nif || "",
    dataNascimento: "",
    diasNascimento: "01",
    mesesNascimento: "01",
    anosNascimento: "2000",
    tipoDocumentoIdentificacao: "CARTA",
    numeroDocumentoIdentificacao: "",
    validadeDocumentoIdentificacao: "",
    diaValidade: "01",
    mesValidade: "01",
    anoValidade: "2030",

    // Morada
    morada: "",
    codigoPostal: "",
    localidade: "",
    paisResidencia: "Portugal",

    // Contactos
    email: email || "",
    telemovel: "",
    contactoPreferencial: "Email"
  });

  // Carregar dados do utilizador 
  useEffect(() => {
    const carregarDadosDoServidor = async () => {
        // usar o nif guardado no localStorage para pedir os dados do perfil
        const nifSalvo = localStorage.getItem("userNif");
        console.log("NIF do perfil:", nifSalvo);

        // Se for undefined ou null, não faz o pedido ao servidor
        if (!nifSalvo || nifSalvo === "undefined" || nifSalvo === "null") {
            console.error("Não foi possível carregar o perfil: NIF em falta.");
            return; 
        }
        
        if (nifSalvo) {
            try {
                const response = await fetch(`https://migale.antrob.eu/backend/get_perfil.php?nif=${nifSalvo}`);
                const result = await response.json();

                if (!nifSalvo) return;

                if (result.status === "success") {
                    const u = result.data;
                    
                    // Preenche o form com os dados do utilizador 
                    setFormData(prev => {
                        // Tratamento da Data de Nascimento (AAAA-MM-DD)
                        const dataN = u.data_nascimento ? u.data_nascimento.split('-') : ["2000", "01", "01"];
                        
                        // Tratamento da Data de Validade do Documento (AAAA-MM-DD)
                        // 'data_validade' -> JOIN do get_perfil.php
                        const dataV = u.data_validade 
                                    ? u.data_validade.split(' ')[0].split('-') 
                                    : ["2030", "01", "01"];

                        return {
                            ...prev,
                            // Dados Pessoais
                            nomeCompleto: u.nome || "",
                            email: u.email || "",
                            nif: u.nif || "",
                            telemovel: u.telemovel || "",
                            nacionalidade: u.nacionalidade || "Portuguesa",
                            genero: u.genero_id || "", // assumir que o backend devolve o id do género

                            // Morada
                            morada: u.rua || "",
                            codigoPostal: u.codigo_postal || "",
                            localidade: u.concelho || "",
                            paisResidencia: u.pais_residente || "Portugal",

                            // Data de Nascimento (Selects)
                            anosNascimento: dataN[0],
                            mesesNascimento: dataN[1],
                            diasNascimento: dataN[2],

                            // Documento de Identificação
                            tipoDocumentoIdentificacao: u.documento_id == 1 ? "CC" : (u.documento_id == 2 ? "Passaporte" : ""),

                            // Número do Documento de Identificação
                            numeroDocumentoIdentificacao: u.num_documento || "",
                            
                            // Data de Validade (Selects)
                            anoValidade: dataV[0],
                            mesValidade: dataV[1],
                            diaValidade: dataV[2]
                            
                        };
                    });
                }
            } catch (error) {
                console.error("Erro em aceder ao servidor:", error);
            }
        }
    };

    carregarDadosDoServidor(); // Executar apenas uma vez ao abrir a página
}, []); 

  // enviar dados ao backend
  const handleSave = async () => {
    const dadosEnviar = {
      nomeCompleto: formData.nomeCompleto,
      genero: formData.genero,
      nacionalidade: formData.nacionalidade,
      nif: formData.nif,
      dataNascimento: formData.dataNascimento,
      diasNascimento: formData.diasNascimento,
      mesesNascimento: formData.mesesNascimento,
      anosNascimento: formData.anosNascimento,
      tipoDocumentoIdentificacao: formData.tipoDocumentoIdentificacao,
      numeroDocumento: formData.numeroDocumentoIdentificacao,
      validadeDocumentoIdentificacao: formData.validadeDocumentoIdentificacao,
      diaValidade: formData.diaValidade,
      mesValidade: formData.mesValidade,
      anoValidade: formData.anoValidade,

      morada: formData.morada,
      codigoPostal: formData.codigoPostal,
      localidade: formData.localidade,
      paisResidencia: formData.paisResidencia,

      email: formData.email,
      telemovel: formData.telemovel,
      contactoPreferencial: formData.contactoPreferencial
    };

    try {
      const response = await fetch('https://migale.antrob.eu/backend/update_perfil.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosEnviar),
      });

      const result = await response.json();
      console.log('Success:', result);
      alert("Dados guardados com sucesso!");

    } catch (error) {
      console.error('Error:', error);
      alert("Erro ao guardar dados do perfil.");
    }
  }

  // Frontend
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
            <input type="text" 
                   value={formData.nomeCompleto} 
                   onChange={(e) => setFormData({ ...formData, nomeCompleto: e.target.value })} />

            <label>{t('genero')}</label>
            <select value={formData.genero} 
                    onChange={(e) => setFormData({ ...formData, genero: e.target.value })}>

              <option value="1"> {t('masculino')} </option>
              <option value="2"> {t('feminino')} </option>
              <option value="3"> {t('generoOutro')} </option>
            </select>

            <label>{t('nacionalidade')}</label>
            <select value={formData.nacionalidade} 
                    onChange={(e) => setFormData({ ...formData, nacionalidade: e.target.value })}>
              <option value="Portuguesa">{t('portuguesa')}</option>
            </select>

            <label>{t('nif')}</label>
            <input type="text" 
                   inputMode='numeric' 
                   maxLength={9} 
                   value={formData.nif} 
                   onChange={(e) => {
                     const onlyNumbers = e.target.value.replace(/\D/g, "");
                     setFormData({ ...formData, nif: onlyNumbers });
                   }} />

            <label>{t('dataNascimento')}</label>
            <div className="row">
              <select value={formData.diasNascimento} 
                      onChange={(e) => setFormData({ ...formData, diasNascimento: e.target.value })}>
                {dias.map(d => 
                      <option key={d} value={d}>{d}</option>)}
              </select>

              <select value={formData.mesesNascimento} 
                      onChange={(e) => setFormData({ ...formData, mesesNascimento: e.target.value })}>
                {meses.map(m => 
                       <option key={m} value={m}>{m}</option>)}
              </select>

              <select value={formData.anosNascimento} 
                      onChange={(e) => setFormData({ ...formData, anosNascimento: e.target.value })}>
                {anos.map(a => 
                       <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <label>{t('tipoDocumentoIdentificacao')}</label>
            <div className="doc-type">
              <label>
                {t('cartãoCidadao')} 
                <input className="radio" 
                       type="radio" 
                       name="doc"
                       value="CC"
                       checked={formData.tipoDocumentoIdentificacao === "CC"}
                       onChange={(e) => setFormData({ ...formData, tipoDocumentoIdentificacao: e.target.value })}/> 
              </label>

              <label>
                {t('cartaConducao')} 
                <input className="radio"
                       type="radio" 
                       name="doc" 
                       value="CARTA"
                       checked={formData.tipoDocumentoIdentificacao === "CARTA"}
                       onChange={(e) => setFormData({ ...formData, tipoDocumentoIdentificacao: e.target.value })}/> 
              </label>
            </div>

            <label>{t('numeroDocumentoIdentificacao')}</label>
            <input type="text" 
                   value={formData.numeroDocumentoIdentificacao} 
                   onChange={(e) => setFormData({ ...formData, numeroDocumentoIdentificacao: e.target.value })} />

            <label>{t('validadeDocumentoIdentificacao')}</label>
            <div className="row">
              {/* Validade - Dia */}
              <select value={formData.diaValidade} 
                      onChange={(e) => setFormData({ ...formData, diaValidade: e.target.value })}>
                {dias.map(d => 
                      <option key={d} value={d}>{d}</option>)}
              </select>

              {/* Validade - Mês */}
              <select value={formData.mesValidade} 
                      onChange={(e) => setFormData({ ...formData, mesValidade: e.target.value })}>
                {meses.map(m => 
                       <option key={m} value={m}>{m}</option>)}
              </select>
              
              {/* Validade - Ano */}
              <select value={formData.anoValidade} 
                      onChange={(e) => setFormData({ ...formData, anoValidade: e.target.value })}>
                {anosValidade.map(a => 
                       <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <button className="save-btn" onClick={handleSave}> {t('guardar').toUpperCase()} </button>
          </div>
        )}

        {/* TAB 1 - MORADA */}
        {activeTab === 1 && (
          <div className="form">
            <label>{t('morada')}</label>
            <input type="text" 
                   value={formData.morada} 
                   placeholder={t('aSuaMorada')}
                   onChange={(e) => setFormData({ ...formData, morada: e.target.value })} />

            <label>{t('codigoPostal')}</label>
            <input type="text" 
                   placeholder={t('oSeuCodigoPostal')} 
                   value={formData.codigoPostal} 
                   onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })} />

            <label>{t('localidade')}</label>
            <input type="text" 
                   placeholder={t('aSuaLocalidade')} 
                   value={formData.localidade} 
                   onChange={(e) => setFormData({ ...formData, localidade: e.target.value })} />

            <label>{t('paisResidencia')}</label>
            <select value={formData.paisResidencia} 
                    onChange={(e) => setFormData({ ...formData, paisResidencia: e.target.value })}>

              <option value="Portugal">Portugal</option>
              <option value="Angola">Angola</option>
            </select>
          </div>
        )}

        {/* TAB 2 - CONTACTOS */}
        {activeTab === 2 && (
          <div className="form">
            <label>Email</label>
            <input type="text" 
                   value={formData.email} 
                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                   placeholder={t('oSeuEmail')} />

            <label>{t('telemovel')}</label>
            <input type="text" 
                   value={formData.telemovel} 
                   onChange={(e) => setFormData({ ...formData, telemovel: e.target.value })} 
                   placeholder={t('oSeuTelemovel')} />

            <label>{t('contactoPreferencial')}</label>
            <select value={formData.contactoPreferencial} 
                    onChange={(e) => setFormData({ ...formData, contactoPreferencial: e.target.value })}>

              <option value="Email">Email</option>
              <option value="Telemovel">{t('telemovel')}</option>
            </select>
          </div>
        )}

      </div>
    </PortalMenu>
  );
}

export default PerfilMenuContent;
