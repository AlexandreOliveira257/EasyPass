import { useTranslation } from "react-i18next"
import { toast, Bounce, Slide, Zoom } from 'react-toastify';
import { useNavigate } from "react-router";
import { useUser } from "../Contexts/UserContext";
function VerificarPasseJovem({setView}){
      const { t } = useTranslation();
    const id_pessoa = Number(localStorage.getItem("id_pessoa"));
const {loading,setLoading} = useUser();
    const navigate = useNavigate();

  const notify = () =>
  toast.success("Pagamento confirmado!", {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
  });
  const notifyInfo = () => toast.info('Para mais informações consulte as suas notificações!', {
    position: "bottom-right",
    autoClose: 9000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Zoom,
});
  async function BtnHandlerPagamento() {
       if(loading) return;
        setLoading(true);
    const url = "https://migale.antrob.eu/backend/pagamento.php";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tipo_id: 3,
          id_pessoa: id_pessoa,
          passo_estado_id: 1,
          data_validade: Validade(),
          data_emissao: Emissao(),
          saldo: 0,          
        })
      });

      const data = await response.json();
      console.log(data);

      if (data.informacao === "Passe criado com sucesso!") {
          localStorage.setItem("userPasses", JSON.stringify(data.passesAtualizado));
            notify();
            setTimeout(() => {
              notifyInfo(); // aparece depois
            }, 1200); 
            navigate("/passes");
            setLoading(false);
      }

    } catch (error) {
      console.log("Erro no pagamento:", error);
      setLoading(false);
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


export function Emissao() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
}

export function Validade() {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear() + 1;

  return `${yyyy}-${mm}-${dd}`;
}