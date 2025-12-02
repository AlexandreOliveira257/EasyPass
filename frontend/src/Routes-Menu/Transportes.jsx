import Header from "../Components/header"
import Menu from "../Components/menu"
import LocalizarTransporte from "../Components/localizarTransporte";

function Transporte(){
    return (
        <div>
            <Header/>
            <div className="flex">
                <Menu/>
                <LocalizarTransporte/>
            </div>
        </div>
    )

}
export default Transporte;