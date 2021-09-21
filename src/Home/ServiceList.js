import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {Navbar} from "../components/Navbar";
import ContextoUsuario from "../registeredUser";

export const ServiceList = props => {
	const usuario = useContext(ContextoUsuario);
	return (
<>
<Navbar/>
<div className="row d-flex" style={{"background": "#ff4d4d"}}>
	<div className="col">
	<h5 className="font-weight-bold text-white">Servicios</h5>
	</div>
	<div className="col">
	<h5 className="font-weight-bold text-white">Saldo: ${Number.parseFloat(usuario.response.client.saldo).toFixed(2)}</h5>
	</div>
</div>
{/*<h5 style={{"background": "#ff4d4d", width: "100%"}} className="font-weight-bold text-white">Servicios</h5>*/}
<div className="container-fluid">
	<ul className="list-group">
		<Link to="/inflado" className="btn btn-success text-white text-uppercase font-weight-bold my-3">Inflado</Link>
		<Link to="/termo" className="btn btn-danger text-white text-uppercase font-weight-bold mb-3">Termo</Link>
	  <Link to="/termo" className="btn btn-primary text-white text-uppercase font-weight-bold mb-3">Lavado</Link>
	</ul>
</div>
</>
);
}