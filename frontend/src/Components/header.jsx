import "../Header.css"
import { Link } from "react-router"
import Avatar from '@mui/material/Avatar';
function Header(){
    return <header >
        <Link to="/" className="bus"><img src="EasyPass.png" /></Link>
        <Avatar src="/broken-image.jpg" sx={{ width: 56, height: 56 }} className="avatar" />
        </header> 
}
export default Header