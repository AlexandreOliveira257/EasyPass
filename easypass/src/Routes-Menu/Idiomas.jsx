import Header from "../Components/header"
import Menu from "../Components/menu"
import IdiomaMenuContent from "../Components/idiomaMenuContent"
function Idiomas(){
    return(
        <div>
            <Header/>
            <div className="flex">
            <Menu/>
            <IdiomaMenuContent/>
            </div>
        </div>
    )
}
export default Idiomas