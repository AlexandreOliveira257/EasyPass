import "../Header.css"
import { Link } from "react-router"
import Avatar from '@mui/material/Avatar';
import { useUser } from "../Contexts/UserContext.jsx";
function Header(){
const { fotoPerfil } = useUser();   
 return <header >
        <Link to="/" className="bus"><img src="EasyPass.png" /></Link>
        <Avatar src={fotoPerfil} sx={{ width: 56, height: 56 }} className="avatar" />
        </header> 
}
export default Header