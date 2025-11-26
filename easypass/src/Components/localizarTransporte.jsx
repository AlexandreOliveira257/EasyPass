import React from "react"
import PortalMenu from "./portalMenu"
import "../buttons.css"
import Map from "./localizarTransporteMap/map"

function LocalizarTransporte(){
    return(
      <PortalMenu>
        <Map/>
      </PortalMenu>
    )
}
export default LocalizarTransporte