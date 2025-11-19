import i18n from "i18next";
import { initReactI18next } from "react-i18next";
function changeLanguage(lng) {
  i18n.changeLanguage(lng);
}
i18n.use(initReactI18next).init({
  resources: {
    en: { 
      translation: { 

      //===MENU===
      pedidos:"Requests", 
      movimentos:"Movements",
      perfil:"Profile",
      horarios:"Schedules",
      transportes:"Locate Transports",
      settings:"Settings",
      logout:"Logout",
      //===idiomaMenuContent===

      titleIdioma:"CHANGE LANGUAGE",
      sobre:"ABOUT",
      ingles:"English",
      portugues:"Portuguese",

      //===portalMenuContent===
      notificacoes:"Notifications",
      gerirPasses:"Manage Passes",
      seusPasses:"Your Passes",
      welcome:"Welcome,"
     }  },

    pt: { translation: { 

      //===MENU===
      pedidos:"Pedidos",
      movimentos:"Movimentos", 
      perfil:"Perfil",
      horarios:"Horários",
      transportes:"Localizar Transportes",
      settings:"Definições",
      logout:"Terminar Sessão",

      //===idiomaMenuContent===
      titleIdioma:"ALTERAR IDIOMA",
      sobre:"SOBRE",
      ingles:"Inglês",
      portugues:"Português",
      
      //===portalMenuContent===
      notificacoes:"Notificações",
      gerirPasses:"Gerir Passes",
      seusPasses:"Os seus passes",
      welcome:"Bem-vindo,"} },
  },
  lng: "pt",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});



export default i18n;