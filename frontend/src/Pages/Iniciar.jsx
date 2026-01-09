import React, { useState } from 'react';
import "../Pages/Iniciar.css";
import "../Pages/iniciarRegistar.css";
import { Link, useNavigate } from "react-router-dom";
import PortalMenuContent from '../Components/portalMenuContent';
import { useUser } from '../Contexts/UserContext';

export default function EasyPassLogin() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {username, setUsername, setPedido, setMovimentos, setPasses, setNotifications,setIdPessoa} = useUser();
  const [nif, setNif] = useState("");
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Purple/Blue Background Panel */}
      <div className={`purple-panel ${showLogin || showRegister ? 'slide-left' : ''}`}>

        <div className="brand">
          <div className="bus-icon">
            <img src="EasyPass_Vetor.svg" alt="logo" />
          </div>
        </div>

        {/* Botões Inicio */}
        {!showLogin && !showRegister && (
          <div className="button-group">
            <button onClick={() => setShowLogin(true)} className="btn-primary">
              <span>ENTRAR</span>
              <span className="arrow">
                <img src="./icons/goBackBtn.svg"/>
              </span>
            </button>
            <button onClick={() => setShowRegister(true)} className="btn-primary">
              <span>REGISTAR</span>
              <span className="arrow">
                <img src="./icons/goBackBtn.svg"/>
              </span>
            </button>
            <Link to="/passes">
            <button onClick={() => {setUsername("Convidado") }}className="btn-link">
            ENTRAR COMO CONVIDADO
            </button>
            </Link>
          </div>
        )}
      </div>

      {/* Painel Login */}
      <div className={`login-panel ${showLogin ? 'slide-in' : ''}`}>
        <div className="login-container">
          <div className="login-card">
            {/* Fechar/Voltar */}
            <button onClick={() => setShowLogin(false)} className="backBtn">
              <img src="./icons/goBackBtn.svg"/>
            </button>

            {/* Login Form */}
            <h2>Login</h2>
            
            <div className="form-group">
              <label>Email</label>
              <input onChange={e => setEmail(e.target.value)} type="email" placeholder="O seu email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input onChange={e => setPassword(e.target.value)}type="password" placeholder="A sua palavra-passe" />   
            </div>

            <button onClick={loginSubmit} className="btn-submit">
              <span>ENTRAR</span>
              <span>
                <img src="./icons/goBackBtnWhite.svg"/>
              </span>
            </button>

            <div className="register-prompt">
              <p>Ainda não tem conta na EasyPass?</p>
              <button className="btn-register">
                <span>REGISTAR</span>
                <span className="arrow">
                  <img src="./icons/goBackBtnWhite.svg"/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Painel Registar */}
      <div className={`register-panel ${showRegister ? 'slide-in' : ''}`}>
        <div className="register-container">
          <div className="register-card">
            {/* Close Button */}
            <button onClick={() => setShowRegister(false)} className="backBtn">
              <img src="./icons/goBackBtn.svg"/>
            </button>

            {/* Register Form */}
            <h2>Register</h2>
            
            <div className="form-group">
              <label>Nome Completo</label>
              <input onChange={e=>setUsername(e.target.value)} type="text" placeholder="O seu nome" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input onChange={e=>setEmail(e.target.value)} type="email" placeholder="O seu email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input onChange={e=>setPassword(e.target.value)} type="password" placeholder="A sua palavra-passe" />                   
            </div>

            <div className="form-group">
              <label>Confirmar Password</label>
              <input type="password" placeholder="Confirmar palavra-passe" />                    
            </div>

            <div className="form-group">
              <label>NIF</label>
              <input type="text" inputMode='numeric' placeholder="O seu NIF" 
              maxLength={9}
              value={nif}
              onChange={e => {
                const onlyNumbers = e.target.value.replace(/\D/g, "");
                setNif(onlyNumbers);
              }} />                    
            </div>

            <div className="checkTermos">
              <input className="checkMark" type="checkbox" placeholder="" /> 
              <label>Aceitar Termos e condições</label>                  
            </div>

            <div className="register-form">
              <button onClick={SignUpSubmit} className="btn-register">
                <span>REGISTAR</span>
                <span className="arrow">
                  <img src="./icons/goBackBtnWhite.svg"/>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

 function loginSubmit() {
  const url = "https://migale.antrob.eu/backend/login.php";

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      pass: password
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log("response: ", data); 

      if (data.result === "Login com sucesso!") {
        // apanhar o NIF (prevenção contra maiúsculas/minúsculas)
        const nifRecebido = data.nif || "";

        if (!nifRecebido) {
            console.error("Error: nif not received.");
            return;
        }

        // Gravar no LocalStorage (sempre como string)
        localStorage.setItem("userNif", String(nifRecebido));
        localStorage.setItem("userName", data.nome || "");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userPasses", JSON.stringify(data.passes))
        localStorage.setItem("id_pessoa", data.id_pessoa)
        setNif(String(nifRecebido)); 
        setUsername(data.nome || "");
        setPedido(data.pedidos || []);
        setMovimentos(data.movimentos || []);
        setNotifications(data.notifications || []);

        navigate("/passes");  
      } else {
        alert(data.result);
      }
    })
    .catch(err => console.error("Erro no Fetch:", err));
}

  function SignUpSubmit(){
      const url = "https://migale.antrob.eu/backend/signup.php";
    fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      pass: password,
      nome: username,
      nif: nif
    })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      if (data.result === "Registo efetuado com sucesso") {
        setShowRegister(false)
        setShowLogin(true)
      }
}).catch(err => {
      console.error("Error during sign up:", err);
    });
  }
}