import "../Header.css"
import { Link } from "react-router"
function Header(){
 return <header >
        <Link to="/" className="bus"><img src="EasyPass.png" /></Link>
        </header> 
}
export default Header