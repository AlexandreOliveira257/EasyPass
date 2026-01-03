import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUser } from "../Contexts/UserContext";
import "../Cartoes.css"
function PortalMenuContent(){
    const {t} = useTranslation()
    const [showNotifications, setShowNotifications] = useState(false);
    const {username, setUsername, passes, setPasses, notifications, setNotifications, loading, setLoading} = useUser();
    const userPasses = JSON.parse(localStorage.getItem("userPasses"))
    var cardStyle = ""
    // Recuperar sessão se o context estiver vazio
    useEffect(() => {
        if (!username) {
            const storedName = localStorage.getItem("userName");
            if (storedName && setUsername) {
                setUsername(storedName);
            }
        }
    }, [username, setUsername]);

    async function NavigationHandler() {
    if (!username){
        alert("Não existe nenhum username definido!")
    return;     
    }  //a function para de executar no momento em que o username nao existe

    if (loading) return; //bloqueia múltiplos cliques 

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
            {/* trim -> tirar espaços desnecessários */}
            {/* split -> dividir o nome em partes -> array para selecionar nome [0] */}
        <h1>{t('welcome')}, {(username || localStorage.getItem("userName") || "").trim().split(" ")[0]}</h1>
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
        <div>
            <div className="passes-container">
  {userPasses.map((el) => (
    <div className={el.nome_tipo === "Passe Urbano" || el.nome_tipo ===  "Passe Jovem" ? "pass-card": "pass-cardTrain"} key={el.id_passe}>
      
      <div className="pass-header">
        
        <div className="avatarPass">
        </div>

        <div className="user-info">
          <h3>{username}</h3>
          <p>Identificação: {el.id_passe}</p>
        </div>
        {el.nome_tipo === "Passe Urbano" || el.nome_tipo ===  "Passe Jovem" ?  <img className="passIcon" src="bus.svg"/>
         : <img className="passTrainIcon" src="trainPass.svg"/>
}
      </div>

      <div className="pass-body">
        <div className="pass-row">
          <span className="label">PassID</span>
          <span>{el.id_passe}</span>
        </div>

        <div className="pass-row">
          <span className="label">Modalidade</span>
          <span>{el.nome_tipo}</span>
        </div>

        <div className="pass-row">
          <span className="label">Emissão</span>
          <span>{el.data_emissao}</span>
        </div>

        <div className="pass-row">
          <span className="label">Validade</span>
          <span>{el.data_validade}</span>
        </div>
        <div className="pass-row">
        </div>
      
      </div>
    </div>
  ))}
  <Link to="/criarpasse"><img className="criarPasse" src={t('criarpasse')}/></Link>
</div>

        
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