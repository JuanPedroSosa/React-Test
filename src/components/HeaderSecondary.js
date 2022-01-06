import React from "react";
//import ContextoUsuario from "../registeredUser";
import { useWebsocket } from "../registeredUser2";
export const HeaderSecondary = () => {
	//const usuario = useContext(ContextoUsuario);
	const { data } = useWebsocket();
	return (
	<>
	<div className="row d-flex" style={{"background": "#ff4d4d"}}>
		<div className="col">
		<h5 className="font-weight-bold text-white">Servicios</h5>
		</div>
		<div className="col">
		<h5 className="font-weight-bold text-white">Saldo: ${Number.parseFloat(data.client !== undefined ? data.client.saldo : 0).toFixed(2)}</h5>
		</div>
	</div>
	</>)
}