import React from "react"
import "../App.css"
import { Routes,Route } from "react-router"
import Passes from "../Routes/Passes"
import PortalPage from "./PortalPage"
function App(){
    return(
        <div className="bgImg">
            <Routes>
                <Route path="/" element={<PortalPage/>}/>
                <Route path="/passes" element={<Passes/>}/>
            </Routes>
        </div>
    )
}
export default App