import Header from "../Components/header"
import Menu from "../Components/menu"
import HorarioMenuContent from "../Components/horariosMenuContent"

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