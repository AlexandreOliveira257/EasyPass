import CriarPasseMenuContent from "../Components/criarPasseMenuContent"
import Header from "../Components/header"
import PortalMenu from "../Components/portalMenu"

function CriarPasse(){
return(
    <>
    <Header/>
    <PortalMenu>
        <CriarPasseMenuContent/>
    </PortalMenu>
    </>
)
}
export default CriarPasse