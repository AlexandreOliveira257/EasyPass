import Header from "../Components/header"
import Menu from "../Components/menu"
import MovimentosMenuContent from "../Components/movimentosMenuContent"
function Movimentos(){
    return(
        <div>
        <Header/>
        <div className="flex">
        <Menu/>
        <MovimentosMenuContent/>
        </div>
        </div>
    )
}
export default Movimentos