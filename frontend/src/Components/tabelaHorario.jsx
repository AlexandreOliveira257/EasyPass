import "../Horarios.css"
function TabelaHorario(){

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
                <tr>
                    <td>12:30</td>
                    <td>13:23</td>
                    <td>Dias úteis</td>
                    <td>Férias Esc.</td>
                    <td>1982</td>
                    <td class="logo-cell">
                       
                    </td>
                    <td class="info-cell"><span class="info-icon">ⓘ</span></td>
                </tr>
                <tr>
                    <td>13:40</td>
                    <td>14:27</td>
                    <td>Dias úteis</td>
                    <td>Período Esc</td>
                    <td>982</td>
                    <td class="logo-cell">
                        
                    </td>
                    <td class="info-cell"><span class="info-icon">ⓘ</span></td>
                </tr>
                <tr>
                    <td>17:15</td>
                    <td>18:22</td>
                    <td>Dias úteis</td>
                    <td>Período Esc.</td>
                    <td>195</td>
                    <td class="logo-cell">
                        
                    </td>
                    <td class="info-cell"><span class="info-icon">ⓘ</span></td>
                </tr>
                <tr>
                    <td>17:35</td>
                    <td>18:47</td>
                    <td>Dias úteis</td>
                    <td>Todo o Ano</td>
                    <td>608</td>
                    <td class="logo-cell">
                        
                    </td>
                    <td class="info-cell"><span class="info-icon">ⓘ</span></td>
                </tr>
                <tr>
                    <td>18:15</td>
                    <td>19:12</td>
                    <td>Dias úteis</td>
                    <td>Férias Esc.</td>
                    <td>1982</td>
                    <td class="logo-cell">
                        
                    </td>
                    <td class="info-cell"><span class="info-icon">ⓘ</span></td>
                </tr>
                <tr>
                    <td>18:45</td>
                    <td>19:46</td>
                    <td>Dias úteis</td>
                    <td>Período Esc.</td>
                    <td>1982</td>
                    <td class="logo-cell">
                        
                    </td>
                    <td class="info-cell"><span class="info-icon">ⓘ</span></td>
                </tr>
            </tbody>
        </table>
    </div>
        </div>
    )
}
export default TabelaHorario