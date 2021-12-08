import React, { useContext } from "react";
import ContextoUsuario from "../registeredUser";

export const HeaderSecondary = () => {
	const usuario = useContext(ContextoUsuario);
	return (
	<>
	<div className="row d-flex" style={{"background": "#ff4d4d"}}>
		<div className="col">
		<h5 className="font-weight-bold text-white">Servicios</h5>
		</div>
		<div className="col">
		<h5 className="font-weight-bold text-white">Saldo: ${Number.parseFloat(usuario.response !== undefined ? usuario.response.client.saldo : 0).toFixed(2)}</h5>
		</div>
	</div>
	</>)
}