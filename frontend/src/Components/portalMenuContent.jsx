import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import { useUser } from "../Contexts/UserContext";
import { toast, Zoom } from "react-toastify";
import "../Cartoes.css"
import Avatar from '@mui/material/Avatar';

function PortalMenuContent(){
    const {t} = useTranslation()
    const [showPassDetails, setShowPassDetails] = useState(false);
    const [selectedPass, setSelectedPass] = useState(null);
    const [showNotifications, setShowNotifications] = useState(false);
    const {username, setUsername, notifications, setNotifications,pedidos,setPedido, loading, setLoading, fotoPerfil} = useUser();
    const userPasses = JSON.parse(localStorage.getItem("userPasses"))
    const id_pessoa = Number(localStorage.getItem("id_pessoa"));

    const notify = () => 
      toast.success("Notificações eliminadas!", {
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

    const notifyMovimentos = () => 
      toast.info("Movimentos atualizados!", {
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
    const notifyDelete = () => 
      toast.success("Passe apagado com sucesso!", {
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

    const notifyRenovar = () => 
      toast.success("Passe renovado com sucesso!", {
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

    const notifyRecarregar = () => 
      toast.success("Passe recarregado com sucesso!", {
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
        }

        if (loading) return;

        setLoading(true);
        const url = "https://migale.antrob.eu/backend/PMP.php";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id_pessoa }),
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
            setLoading(false);
        }
    }//NavigationHandler

        async function clearNotifications() {
        if (!window.confirm("Tem certeza que deseja limpar todas as notificações?")) {
            return;
        }

        if (loading) return;

        setLoading(true);
        const url = "https://migale.antrob.eu/backend/clearNotifications.php";

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username }), 
            });
            
            const data = await response.json();
            console.log(data);

            if (data.success) {
                setNotifications([]);
                notify();
                setLoading(false);
            } else {
              setLoading(false);
                alert("Erro ao limpar notificações: " + (data.message || "Erro desconhecido"));
            }//if
        } catch (error) {
              setLoading(false);
            console.log("Ocorreu um erro:", error);
        }// try-catch
      }//clearNotifications

        async function handlePass(idPasse, action) {
            if (loading) return;
            let amount = null;
        setLoading(true);
        if(action === "recarregar"){
             amount = prompt("Insira o valor a recarregar:");
            if (amount === null || isNaN(amount) || Number(amount) <= 0 ) {
                alert("Valor inválido para recarregar.");
                setLoading(false);
                return;
            }
            if(amount > 20){
                alert("O valor máximo para recarregar é 20€.");
                setLoading(false);
                return;
            }
        }
        if(action === "apagar"){
            const confirmDelete = window.confirm("Tem certeza que deseja apagar este passe?");  
            if (!confirmDelete) {
                setLoading(false);
                return; 
            }
        }
            try {
        const response = await fetch("https://migale.antrob.eu/backend/handlePass.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({idPasse, action, amount}),
        });
        const data = await response.json();
            if (data.success) {
                setSelectedPass(null);
                setShowPassDetails(false);
                setLoading(false);
                setTimeout(() => {
                notifyMovimentos();
                }, 1200);
                // Atualiza userPasses no localStorage
                    if(action === "apagar") {
                        const updatedPasses = userPasses.filter(passe => passe.id_passe !== idPasse);
                        localStorage.setItem("userPasses", JSON.stringify(updatedPasses));
                    } else if (action === "renovar" || action === "recarregar") {

                        // Atualiza apenas o passe específico
                        const updatedPasses = userPasses.map(passe => {
                            if(passe.id_passe === idPasse) {
                                if(action === "renovar") passe.data_validade = data.nova_Data_Validade; // opcional, se backend retornar
                                if(action === "recarregar") passe.saldo = Number(passe.saldo) + Number(amount);
                            }
                            return passe;
                        });
                        localStorage.setItem("userPasses", JSON.stringify(updatedPasses));
                    }//if
    //EXIBIÇÃO DE NOTIFICAÇÕES
                switch(action) {
                    case "apagar":
                        notifyDelete();
                        break;
                    case "renovar":
                        notifyRenovar();
                        break;  
                    case "recarregar":
                        notifyRecarregar();
                        break; 
                }//switch
            } else {
              setLoading(false);
                alert("Erro na ação: " + (data.message || "Erro desconhecido"));
            }//if
        } catch (error) {
              setLoading(false);
            console.log("Ocorreu um erro:", error);
        }//try-catch
        }//handlePass


    return <PortalMenu>
        {!showNotifications  && !showPassDetails && (
            <>
                <div className="flex">
                    <h1>{t('welcome')}, {(username || localStorage.getItem("userName") || "")}</h1>
                    <nav className="navPortal">
                        <div className="flex">
                            <a onClick={NavigationHandler} className="btnPortal">{t('notificacoes')}</a>
                            <img src="icons/notifications.svg"/>
                        </div>
                    </nav>
                </div>
                <div className="hrPortal"></div>
                <h2 className="osSeusPasses">{t('seusPasses')}</h2>
                <div>
                    <div className="passes-container">
                        {userPasses.map((el) => (
                            <div className={el.nome_tipo === "Passe Urbano" || el.nome_tipo === "Passe Jovem"
                                    ? "pass-card"
                                    : "pass-cardTrain"}
                                key={el.id_passe}
                                onClick={() => {
                                    setSelectedPass(el);
                                    setShowPassDetails(true);
                                }}
                                >

                                <div className="pass-header">
                                    <Avatar src={fotoPerfil}/>
                                    <div className="user-info">
                                        <h3>{username}</h3>
                                        <p>Identificação: {el.id_passe}</p>
                                    </div>
                                    {el.nome_tipo === "Passe Urbano" || el.nome_tipo === "Passe Jovem" ? 
                                        <img className="passIcon" src="bus.svg"/> : 
                                        <img className="passTrainIcon" src="trainPass.svg"/>
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
                                    <div className="pass-row"></div>
                                </div>
                            </div>
                        ))}
                        <Link to="/criarpasse">
                            <img className="criarPasse" src={t('criarpasse')}/>
                        </Link>
                    </div>
                </div>
            </>
        )}
        {showNotifications && (
            <>
                <div className="flex">
                    <h1>Notificações</h1>
                    <div className="flex">
                        
                        <img 
                            className="goBackBtn" 
                            src="icons/goBackBtn.svg" 
                            onClick={() => setShowNotifications(false)}
                        />
                    </div>
                </div>
                <hr></hr>
                {notifications.length >= 1 && (
                  <div className="limparNotifications">
                    <img src="Trashblue.svg"/>
                    <a className="btnLimparNotifications" onClick={clearNotifications}>
                        Limpar Notificações
                    </a>
                  </div>
                        )}
                {notifications.length >= 1 ? (
                    notifications.map((el, index) => (
                      <div className="pedido-container">
                        <div className="pedido-image-container">
                          <img src="EasyPass.png"></img>
                        </div>
                        <div className="pedido-container-mensagem" key={index}>
                            <span>{el.titulo}</span>
                           <span>{el.mensagem}</span>
                            <span>{el.data_envio}</span>
                        </div>
                        </div>
                    ))
                ) : (
                    <p>Não existe notificações no momento</p>
                )}
            </>
        )}
        {showPassDetails && selectedPass && (
  <>
                <div className="flex">
                <h1>Detalhes do Passe</h1>
                <img
                    className="goBackBtn"
                    src="icons/goBackBtn.svg"
                    onClick={() => {
                    setShowPassDetails(false);
                    setSelectedPass(null);
                    }}
                />
                </div>
                <hr />
    <div className="passes-container">
      <div className={
        selectedPass.nome_tipo === "Passe Urbano" || selectedPass.nome_tipo === "Passe Jovem"
          ? "pass-card"
          : "pass-cardTrain"
      }>
        <div className="pass-header">
           <Avatar src={fotoPerfil}/>
          <div className="user-info">
            <h3>{username}</h3>
            <p>Identificação: {selectedPass.id_passe}</p>
          </div>
        </div>

        <div className="pass-body">
                <div className="pass-row">
                    <span className="label">PassID</span>
                    <span>{selectedPass.id_passe}</span>
                 </div>
          <div className="pass-row">
            <span className="label">Modalidade</span>
            <span>{selectedPass.nome_tipo}</span>
          </div>
          <div className="pass-row">
            <span className="label">Emissão</span>
            <span>{selectedPass.data_emissao}</span>
          </div>
          <div className="pass-row">
            <span className="label">Validade</span>
            <span>{selectedPass.data_validade}</span>
          </div>
        </div>
      </div>
      <div className="alignButtonsGerirPasse">
        <p style={{color: "#171766"}}>Saldo: {selectedPass.saldo} €</p>
        <p style={{color: "#171766"}}>Estado: {selectedPass.estado_passe_descricao}</p>
       <button style={{margin: "0.5vw"}}className="save-btn btnDelete" onClick={() => handlePass(selectedPass.id_passe, "apagar")}>
          Apagar Passe
        </button>
        <button style={{margin: "0.5vw"}} className="save-btn" onClick={() => handlePass(selectedPass.id_passe, "renovar")}>
          Renovar
        </button>
        <button style={{margin: "0.5vw"}} className="save-btn" onClick={() => handlePass(selectedPass.id_passe, "recarregar")}>
          Recarregar Saldo
        </button>
        </div>
    </div>
  </>
)}

    </PortalMenu>
  }

export default PortalMenuContent