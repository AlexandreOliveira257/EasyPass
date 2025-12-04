import Header from "../Components/header"
import Menu from "../Components/menu"
import SobreMenuContent from "../Components/sobreMenuContent"

function Sobre(){
    return(
        <div>
            <Header/>
            <div className="flex">
            <Menu/>
            <SobreMenuContent/>
            </div>
        </div>
    )
}
export default Sobre