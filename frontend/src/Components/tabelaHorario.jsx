import "../Horarios.css"
function TabelaHorario(){
    return(
        <div>
            <div class="containerHorario">
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
                        <svg class="logo" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="50" cy="25" rx="45" ry="22" fill="#1e40af" opacity="0.8"/>
                            <text x="50" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">VIEIRA</text>
                            <text x="50" y="33" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">TEJO</text>
                        </svg>
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
                        <svg class="logo" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="50" cy="25" rx="45" ry="22" fill="#1e40af" opacity="0.8"/>
                            <text x="50" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">VIEIRA</text>
                            <text x="50" y="33" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">TEJO</text>
                        </svg>
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
                        <svg class="logo" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="50" cy="25" rx="45" ry="22" fill="#1e40af" opacity="0.8"/>
                            <text x="50" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">VIEIRA</text>
                            <text x="50" y="33" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">TEJO</text>
                        </svg>
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
                        <svg class="logo" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="50" cy="25" rx="45" ry="22" fill="#1e40af" opacity="0.8"/>
                            <text x="50" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">VIEIRA</text>
                            <text x="50" y="33" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">TEJO</text>
                        </svg>
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
                        <svg class="logo" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="50" cy="25" rx="45" ry="22" fill="#1e40af" opacity="0.8"/>
                            <text x="50" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">VIEIRA</text>
                            <text x="50" y="33" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">TEJO</text>
                        </svg>
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
                        <svg class="logo" viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="50" cy="25" rx="45" ry="22" fill="#1e40af" opacity="0.8"/>
                            <text x="50" y="20" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">VIEIRA</text>
                            <text x="50" y="33" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="white" text-anchor="middle">TEJO</text>
                        </svg>
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