import Header from "../Components/header"
import HorarioMenuContent from "../Components/horariosMenuContent"
import Menu from "../Components/menu"

function Horarios(){
    return (
        <div>
            <Header/>
            <div className="flex">
                <Menu/>
                <HorarioMenuContent/>
            </div>
        </div>
    )


}
export default Horarios