import React from "react"
import Header from "./Components/header"
import "./App.css"
import Menu from "./Components/menu"
import PortalMenuContent from "./Components/portalMenuContent"
function App(){
    return(
        <div className="bgImg">
            <Header/>
            <div className="flex">
            <Menu/>
            <PortalMenuContent/>
            </div>
        </div>
    )
}
export default App