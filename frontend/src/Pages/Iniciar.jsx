import React, { useState } from 'react';
import "../Pages/Iniciar.css";
import "../Pages/iniciarRegistar.css";

export default function EasyPassLogin() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

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
        {!showLogin && (
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
            <button className="btn-link">
              ENTRAR COMO CONVIDADO
            </button>
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
              <input type="email" placeholder="O seu email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="A sua palavra-passe" />   
              <a href="#" className="forgot-password">Esqueceu-se da palavra-passe?</a>                  
            </div>

            <button className="btn-submit">
              <span>ENTRAR</span>
              <span>
                <img src="./icons/goBackBtnWhite.svg"/>
              </span>
            </button>

            <div className="divider">
              <span>OU ENTRE COM UMA DAS SEGUINTES CONTAS:</span>
            </div>

            <button className="btn-google">
              <img src="./icons/googleRegisterIcon.svg" alt="Registar com Google" />
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
              <input type="text" placeholder="O seu nome" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="O seu email" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="A sua palavra-passe" />                   
            </div>

            <div className="form-group">
              <label>Confirmar Password</label>
              <input type="password" placeholder="Confirmar palavra-passe" />                    
            </div>

            <div className="form-group">
              <label>NIF</label>
              <input type="number" placeholder="O seu NIF" />                    
            </div>

            <div className="checkTermos">
              <input className="checkMark" type="checkbox" placeholder="" /> 
              <label>Aceitar Termos e condições</label>                  
            </div>

            <div className="register-form">
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
    </div>
  );
}