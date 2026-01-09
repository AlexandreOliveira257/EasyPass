import { useEffect, useState } from "react"
import "../Horarios.css"
import { useUser } from "../Contexts/UserContext"
function TabelaHorario({ origem, destino }){
    const [horario, setHorario] = useState([])
    const {loading, setLoading} = useUser()
    useEffect(() =>{
        setLoading(true)
        const url =
        "https://corsproxy.io/?" +
        encodeURIComponent(`https://rtejo-search-engine.bitcliq.com/JsonHandler.ashx?t=s&s=rt&o=${origem}&d=${destino}`);

      fetch(url) //tive que usar fetch aqui porque...nãosei, supostamente a outra api envia jsonp e esta envia json puro
        .then(r => r.json())
        .then(data => {
             setHorario(data)
             setLoading(false)
        });
        },[origem, destino]);//useEffect
    return(
        <div>
            <div className="containerHorario">
        <table>
            <thead>
                <tr>
                    <th>Partida</th>
                    <th>Chegada</th>
                    <th>Frequência</th>
                    <th>Período</th>
                    <th>Carreira</th>
                    <th>Operador</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            
               {horario.length > 0 ? horario.map((el => <tr>
                        <td>{el.DepartureTimeStr}</td>
                        <td>{el.EstimatedArrivalTimeStr}</td>
                        <td>{el.Frequency}</td>
                        <td>{el.Period}</td>
                        <td>{el.Row}</td>
                        <td className="logo-cell">
                        <img className="logo"src={el.OperatorLogo}></img>
                        </td>
                        <td className="info-cell"><span className="info-icon">ⓘ</span></td>
                    </tr>)) : <tr><td style={{textAlign: "center"}} colSpan={7}>Não existe horários</td></tr>}
                    
            </tbody>
        </table>
    </div>
        </div>
    )
}
export default TabelaHorario