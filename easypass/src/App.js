import React from "react"
import Header from "./Components/header"
import "./App.css"
import Menu from "./Components/menu"
function App(){
    return(
        <div className="bgImg">
            <Header/>
            <Menu/>
        </div>
    )
}
export default App