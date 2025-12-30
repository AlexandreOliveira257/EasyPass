import { useTranslation } from "react-i18next";
import "../menu.css";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";
import { useState } from "react";
import PortalMenuContent from "./portalMenuContent";

function Menu() {
  const { t } = useTranslation();
  const { username, setUsername, setPedido, setMovimentos, loading, setLoading } = useUser();
  const navigate = useNavigate();

  // Função para terminar sessão
  const handleLogout = () => {
    // Limpa todos os dados guardados
    localStorage.clear();

    // Redireciona para o login
    window.location.href = "/iniciar"; 
  };

   async function NavigationHandler(route) {
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
        setPedido(data.pedidos);
        setMovimentos(data.movimentos);
        navigate(route);
      }
    } catch (error) {
      console.log("Ocorreu um erro:", error);
    } finally {
      setLoading(false); // garante que o loading acabe
      
    }
  }

  return (<>
    
    <div className="barraMenu">
      <h1 className="menu">Menu</h1>

      <nav className="iconsMenu">
        <Link to="/passes">
        <img src="icons/passe.svg" />Passes
        </Link>

        <a disabled={loading} onClick={() => NavigationHandler("/pedidos")} className="menu-link">
          <img src="icons/pedidos.svg"/>
        {t("pedidos")}
        </a>

        <a disabled={loading} onClick={() => NavigationHandler("/movimentos")} className="menu-link">
          <img src="icons/movimentos.svg"/>
          {t("movimentos")}
        </a>

        <Link to="/perfil">
        <img src="icons/User.svg" />
        {t("perfil")}
        </Link>

        <Link to="/horarios">
        <img src="icons/horários.svg" />
        {t("horarios")}
        </Link>

        <Link to="/localizarTransporte">
        <img src="icons/localizar.svg" />
        {t("transportes")}
        </Link>

        <div className="barra"></div>

        <Link to="/definicoes" className="definicoes">
        <img src="icons/settings.svg" />
        {t("settings")}
        </Link>

        <Link onClick={handleLogout} className="terminarSessao">
          <img src="icons/logout.svg" />{t("logout")}
        </Link>
      </nav>
    </div>
    </>
  );
  
}

export default Menu;
