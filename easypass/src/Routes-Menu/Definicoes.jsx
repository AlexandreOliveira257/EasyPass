import Header from "../Components/header"
import Menu from "../Components/menu"
import DefinicoesMenuContent from "../Components/definicoesMenuContent"
function Definicoes(){
    return(
        <div>
            <Header/>
            <div className="flex">
            <Menu/>
            <DefinicoesMenuContent/>
            </div>
        </div>
    )
}
export default Definicoes