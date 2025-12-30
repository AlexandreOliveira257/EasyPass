import i18n from "i18next";
import { initReactI18next } from "react-i18next";

function changeLanguage(lng) {
  i18n.changeLanguage(lng);
}
i18n.use(initReactI18next).init({
  resources: {
    en: { 
      translation: { 

      sim:"Yes",
      nao:"No",

      //===MENU===
      pedidos:"Requests", 
      movimentos:"Movements",
      perfil:"Profile",
      horarios:"Schedules",
      transportes:"Locate Transports",
      settings:"Settings",
      sobre:"About",
      logout:"Logout",

      //===SOBRE===
      termosECondicoes:"Terms and Conditions", 
      politicaPrivacidade:"Privacy Policy",
      acessibilidade:"Accessibility",

      //===Profile===
      alterarFoto: "Change Photo",
      dadosPessoais: "Personal Data",
      morada: "Address",
      contactos: "Contacts",
      nomeCompleto: "Full Name",
      genero: "Gender",
      masculino: "Male",
      feminino: "Female",
      generoOutro: "Other",
      nacionalidade: "Nationality",
      portuguesa: "Portuguese",
      dataNascimento: "Birthday Date",
      nif: "Tax ID",
      tipoDocumentoIdentificacao: "ID Document Type",
      cartãoCidadao: "Citizen Card",
      cartaConducao: "Driver's License",
      numeroDocumentoIdentificacao: "ID Document Number",
      validadeDocumentoIdentificacao: "ID Document Expiry Date",
      guardar: "save",
      codigoPostal: "Postal Code",
      localidade: "City",
      paisResidencia: "Country of Residence",
      aSuaMorada: "Your address...",
      oSeuCodigoPostal: "Your postal code...",
      aSuaLocalidade: "Your city...",
      oSeuEmail: "Your email...",
      telemovel: "Mobile",
      oSeuTelemovel: "Your mobile...",
      contactoPreferencial: "Preferred Contact",
      requerPasseFisico:"Require a physical pass?",

      //===NewPass===
      escolhaMeioTransporte: "Choose the Means of Transport",
      barco: "Boat",
      autocarro: "Bus",
      comboio: "Train",
      metro: "Metro",
      modalidade: "Type",
      pagamento: "Payment",
      verificarDados: "Check Details",
      passeFerroviarioVerde: "Passe Ferroviário Verde",
      passeUrbano: "Urban Pass",
      passeJovem: "Youth Pass",
      passeDigital: "Digital Pass",
      passeCriadoSucesso: "Pass created successfully!",
      escolherOperadorPreferencia: "Choose your preferred operator",
      escolherPassePretendeCriar: "Choose the pass you want to create",
      verificarPagamento:"Payment",
      //===Schedules===
      pesquisaHorarios:"SEARCH SCHEDULE",
      pesquisa:"SEARCH",

      //===idiomaMenuContent===

      titleIdioma:"CHANGE LANGUAGE",
      sobre:"ABOUT",
      ingles:"English",
      portugues:"Portuguese",

      //===portalMenuContent===
      notificacoes:"Notifications",
      gerirPasses:"Manage Passes",
      seusPasses:"Your Passes",
      welcome:"Welcome",
      criarpasse:"icons/createpass.svg"
     }  },

    pt: { translation: { 

      sim:"Sim",
      nao:"Não",

      //===MENU===
      pedidos:"Pedidos",
      movimentos:"Movimentos", 
      perfil:"Perfil",
      horarios:"Horários",
      transportes:"Localizar Transportes",
      settings:"Definições",
      sobre:"Sobre",
      logout:"Terminar Sessão",

      //===SOBRE===
      termosECondicoes:"Termos e Condições", 
      politicaPrivacidade:"Politica de Privacidade",
      acessibilidade:"Acessibilidade",

      //===Perfil===
      alterarFoto: "Alterar Foto",
      dadosPessoais: "Dados Pessoais",
      morada: "Morada",
      contactos: "Contactos",
      nomeCompleto: "Nome Completo",
      dataNascimento: "Data de nascimento",
      genero: "Género",
      masculino: "Masculino",
      feminino: "Feminino",
      generoOutro: "Outro",
      nacionalidade: "Nacionalidade",
      portuguesa: "Portuguesa",
      nif: "NIF",
      tipoDocumentoIdentificacao: "Tipo de Documento de Identificação",
      cartãoCidadao: "Cartão de Cidadão",
      cartaConducao: "Carta de Condução",
      numeroDocumentoIdentificacao: "Número do Documento de Identificação",
      validadeDocumentoIdentificacao: "Validade do Documento de Identificação",
      guardar: "guardar",
      codigoPostal: "Código Postal",
      localidade: "Localidade",
      paisResidencia: "País de Residência",
      aSuaMorada: "A sua morada...",
      oSeuCodigoPostal: "O seu código postal...",
      aSuaLocalidade: "A sua localidade...",
      oSeuEmail: "O seu email...",
      telemovel: "Telemóvel",
      oSeuTelemovel: "O seu telemóvel...",
      contactoPreferencial: "Contacto Preferencial",
      requerPasseFisico:"Requer passe físico?",

      //===CriarPasse===
      escolhaMeioTransporte: "Escolha o meio de Transporte",
      barco: "Barco",
      autocarro: "Autocarro",
      comboio: "Comboio",
      metro: "Metro",
      modalidade:"Modalidade",
      pagamento:"pagamento",
      verificarDados:"verificar dados",
      passeFerroviarioVerde:"Passe Ferroviário Verde",
      passeUrbano:"Passe Urbano",
      passeJovem:"Passe Jovem",
      passeDigital:"Passe Digital",
      passeCriadoSucesso:"Passe criado com sucesso!",
      escolherOperadorPreferencia:"Escolha o operador de preferência",
      escolherPassePretendeCriar:"Escolha o passe que pretende criar",
      verificarPagamento:"Pagamento",
      //===Horários===
      pesquisaHorarios:"PESQUISA DE HORARIOS",
      pesquisa:"Pesquisa",

      //===idiomaMenuContent===
      titleIdioma:"ALTERAR IDIOMA",
      sobre:"SOBRE",
      ingles:"Inglês",
      portugues:"Português",
      
      //===portalMenuContent===
      notificacoes:"Notificações",
      gerirPasses:"Gerir Passes",
      seusPasses:"Os seus passes",
      welcome:"Bem-vindo",
      criarpasse:"criarPasse.svg"}
     },
  },
  lng: "pt",
  fallbackLng: "en",
  interpolation: { escapeValue: false }
});



export default i18n;