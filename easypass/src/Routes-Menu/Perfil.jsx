import Header from "../Components/header"
import Menu from "../Components/menu"
import PerfilMenuContent from "../Components/perfilMenuContent"
function Perfil(){
    return(
        <div>
        <Header/>
        <div className="flex">
        <Menu/>
        <PerfilMenuContent/>
        </div>
        </div>
    )
}
export default Perfil