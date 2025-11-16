import React from "react"
import "../App.css"
import { HashRouter as Router, Routes, Route } from "react-router-dom";
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