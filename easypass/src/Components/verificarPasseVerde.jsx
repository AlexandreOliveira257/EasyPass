function VerificarPasseVerde({setView}){
    return(
        <div className="formPerfil">
        <div className="flex">
        <span></span><img onClick={()=>setView("none")} className="goBackBtn" src="icons/goBackBtn.svg"/>
        </div>
        <div className="photo-area">
          <h1>VERIFICAR DADOS</h1>
        </div>

          <div className="form">
            <label>Nome Completo</label>
            <input type="text" defaultValue="Luís José António" />
            <label>Modalidade</label>
            <input disabled type="text" defaultValue="Passe Ferroviário Verde" />

            <label>NIF</label>
            <input type="text" defaultValue="235666789" />

            <label>Tipo Documento Identificação</label>
            <div className="doc-type">
              <label>
                Cartão de cidadão <input defaultChecked className="radio" type="radio" name="doc" /> 
              </label>
              <label>
                Cartão de condução <input className="radio" type="radio" name="doc"  /> 
              </label>
            </div>

            <label>Requer passe físico?</label>
            <div className="doc-type">
              <label>
                Sim <input defaultChecked className="radio"type="radio" name="passeTrue" /> 
              </label>
              <label>
                Não <input className="radio" type="radio" name="passeFalse"  /> 
              </label>
            </div>
            <hr></hr>
            <p>Passe Digital: 5€</p>
            <p>Modalidade: 5€</p>
            <p>Total: 10€</p>
            <button onClick={()=>setView("passeComboioFinal")} className="save-btn">PAGAMENTO</button>
          </div>
          </div>
    )
}export default VerificarPasseVerde