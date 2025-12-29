import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useState } from "react";
import { Link } from "react-router";
import { useUser } from "../Contexts/UserContext";
function PortalMenuContent(){
    const {t} = useTranslation()
    const [showNotifications, setShowNotifications] = useState(false);
    const {username, passes, notifications, setNotifications, loading, setLoading} = useUser();
    async function NavigationHandler() {
    if (!username){
        alert("Não existe nenhum username definido!")
    return;     
    }  //a function para de executar no momento em que o username nao existe
    if (loading) return;    //bloqueia múltiplos cliques 

    setLoading(true);
    const url = "https://migale.antrob.eu/backend/PMP.php";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();
      console.log(data);

      if (data.informacao === "Pedidos, Movimentos e notificações obtidos com sucesso!") {
        setNotifications(data.notifications)
        setShowNotifications(!showNotifications)
    }
    } catch (error) {
      console.log("Ocorreu um erro:", error);
    } finally {
      setLoading(false); // garante que o loading acabe
    }
  }

     return  <PortalMenu>
        {!showNotifications && (
            <>
        <div className="flex">
        <h1>{t('welcome')} {username}</h1>
        <nav className="navPortal">
            <div className="flex">
            <a onClick={NavigationHandler} className="btnPortal">{t('notificacoes')}</a><img src="icons/notifications.svg"/>
            </div>
            <div className="flex">
            <a className="btnPortal">{t('gerirPasses')}</a><img src={"icons/gerirPasses.svg"}/>
            </div>
        </nav>
        </div>
        <div className="hrPortal"></div>
        <h2 className="osSeusPasses">{t('seusPasses')}</h2>
        <div className="idiomaFlex">
            {
                passes.map((el) => (
                <div key={el.id_passe}>
                    <span>{el.id_passe}</span>
                    <span>{el.data_emissao}</span>
                    <span>{el.data_validade}</span>
                    <span>{el.estado_passe_descricao}</span>
                    <span>{el.nome_tipo}</span>
                    <span>{el.preco}</span>
                    <span>{el.saldo}</span>
                </div>
                ))
            }
        <Link to="/criarpasse"><img className="criarPasse" src={t('criarpasse')}/></Link>
        </div>
        
        </>
        )}
        {showNotifications && (
            <>
            <div className="flex">
            <h1>Notificações</h1>
            <img className="goBackBtn" src="icons/goBackBtn.svg" onClick={() => setShowNotifications(false)}/>
            </div>
            <hr></hr>
            {notifications.length >= 1 ? (
            notifications.map((el)=>(
                <div>
                    {el.titulo}
                    {el.mensagem}
                    {el.data_envio}
                </div>
            ))
                ) : (<p>Não existe notificações no momento</p> )
            }
            </>
      )}
      
    </PortalMenu>
}

export default PortalMenuContent