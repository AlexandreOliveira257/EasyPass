import { useTranslation } from "react-i18next"
import { useUser } from "../Contexts/UserContext"

function VerificarPasseJovem({setView}){
      const { t } = useTranslation();
  const { idpessoa, username, setPasses } = useUser();

  async function BtnHandlerPagamento() {
    const url = "https://migale.antrob.eu/backend/pagamento.php";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_id: 1,
          id_pessoa: idpessoa,
          passo_estado_id: 1,
          data_validade: Validade(),
          data_emissao: Emissao(),
          saldo: 0
        })
      });

      const data = await response.json();
      console.log(data);

      if (data.informacao === "Passe criado com sucesso!") {
        setPasses(data.passesAtualizado)
        setView("passeAutocarroFinal");
      }

    } catch (error) {
      console.log("Erro no pagamento:", error);
    }
  }

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
            <button onClick={BtnHandlerPagamento} className="save-btn">{t('pagamento').toUpperCase()}</button>
          </div>
          </div>
    )
}export default VerificarPasseJovem


function Emissao(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear();

  return today = yyyy + '/' + mm + '/' + dd ;
}

function Validade(){
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); 
  var yyyy = today.getFullYear()+1;

  return today = yyyy + '/' + mm + '/' + dd ;
}