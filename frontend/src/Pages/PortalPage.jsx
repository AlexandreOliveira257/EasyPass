import Header from "../Components/header"
import Menu from "../Components/menu"
import PortalMenuContent from "../Components/portalMenuContent"

function PortalPage(){
    return(
        <div className="bgImg">
            <Header/>
            <div className="flex">
                <Menu/>
                <PortalMenuContent/>
            </div>
        </div>
    )
}
export default PortalPage