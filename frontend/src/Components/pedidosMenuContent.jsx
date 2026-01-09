import PortalMenu from "./portalMenu"
import "../buttons.css"
import { Link } from "react-router"
import { useTranslation } from "react-i18next"
import { useState } from "react"
import { useUser } from "../Contexts/UserContext"
import "../Pedidos.css"
import { toast, Zoom } from 'react-toastify';
function PedidosMenuContent(){
  const {pedidos,username,setPedido, setLoading,loading} = useUser();
  const {t} = useTranslation()
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
  async function clearPedidos() {
        if (!window.confirm("Tem certeza que deseja limpar todos os pedidos?")) {
            return;
        }

        if (loading) return;

        setLoading(true);
        const url = "https://migale.antrob.eu/backend/clearPedidos.php";

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
      }//clearPedidos
      return(
      <PortalMenu>
        <h1>{t('pedidos').toUpperCase()}</h1>
        <div className="hrPortal"></div>
        <div className="limparNotifications">
        <img style={{margin: "5px"}} src="Trashblue.svg"/>
        <a className="btnLimparNotifications" onClick={clearPedidos}>Limpar Pedidos</a>
        </div>
        
        {pedidos.length >= 1 ? (
          pedidos.map((el) => (
            <div className="pedido-container">
              <div className="pedido-image-container">
                <img src="EasyPass.png"></img>
              </div>
              
            <div className="pedido-container-mensagem">
              
            <span>{el.mensagem}</span>
            <span>{el.data_emissao}</span>
            <span>{el.estado_pedido_descricao}</span>
            </div>
            </div>
          ))
        ) : ( <p>Não existem pedidos</p> )}
      </PortalMenu>
    )
}
export default PedidosMenuContent