import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useUser } from "../Contexts/UserContext";
import "../Movimentos.css"
import { toast, Zoom } from 'react-toastify';
function MovimentosMenuContent(){
    const {t} = useTranslation()
     const {pedidos,username,setPedido, setLoading,loading,movimentos} = useUser();
     const notify = () => 
      toast.success("Pedidos eliminados!", {
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
    async function clearMovimentos() {
        if (!window.confirm("Tem certeza que deseja limpar todos os movimentos?")) {
            return;
        }

        if (loading) return;

        setLoading(true);
        const url = "https://migale.antrob.eu/backend/clearMovimentos.php";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }), 
            });
            
            const data = await response.json();
            console.log(data);

            if (data.success) {
                setPedido([]);
                notify();
                setLoading(false);
            } else {
              setLoading(false);
                alert("Erro ao limpar pedidos: " + (data.message || "Erro desconhecido"));
            }//if
        } catch (error) {
              setLoading(false);
            console.log("Ocorreu um erro:", error);
        }// try-catch
      }//clearMovimentos
    return(
    <PortalMenu>
        <h1>{t('movimentos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        <div className="limparNotifications">
        <img style={{margin: "5px"}} src="Trashblue.svg"/>
        <a className="btnLimparNotifications" onClick={clearMovimentos}>Limpar Movimentos</a>
        </div>
        {movimentos.length >= 1 ? (
  movimentos.map((el) => (
    <div className="movimentos-container" key={el.id}>
      <div className="movimentos-row">
        <div className="descricao">{el.descricao}</div>
        <div className="tipo">{el.nome_tipo}</div>
        <div className="data">{el.data_hora}</div>
        <div className="valor">{el.valor}</div>
        <div className="saldo-anterior">{el.saldo_anterior}</div>
        <div className="saldo-posterior">{el.saldo_posterior}</div>
      </div>
    </div>
  ))
        ) : ( <p>Não existem movimentos</p> )}
    </PortalMenu>
    )
}
export default MovimentosMenuContent