import { useTranslation } from "react-i18next";
import PortalMenu from "./portalMenu";
function MovimentosMenuContent(){
    const {t} = useTranslation()
    return(
    <PortalMenu>
        <h1>{t('movimentos').toUpperCase()}</h1>
        <hr></hr>
    </PortalMenu>
    )
}
export default MovimentosMenuContent