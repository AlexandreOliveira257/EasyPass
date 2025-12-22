import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { useUser } from '../Contexts/UserContext';
import { useState } from "react";
function PasseComboioFinal(){
    const {t} = useTranslation()
    const {username} = useUser()
    
     return(
        <div>
            <div className="flex">
        <span></span><Link to="/passes"><img className="goBackBtn" src="icons/goBackBtn.svg"/></Link>
        </div>
        <h3 className="criarPasseh3">{t('passeCriadoSucesso')}</h3>
        <div className="criarPasseFlexImages">
            <div className="cardContainer">
            <div className="cardFlex">
            <img className="cardAvatar" src="Generic-avatar.png"></img>
            <div className="cardFlexColumn">
            <p className="cardNome">{username}</p>
            </div>
            </div>
            <div className="cardFlex cardJustify">
            <div>
            <p className="cardPass">PassID: </p>
            <img className="cardImageTrain" src="./icons/trainPass.svg"></img>
            </div>
            <p className="cardModalidade">Modalidade: Passe Verde</p>
            </div>
            </div>
        </div>
        </div>
    )
} 
export default PasseComboioFinal