import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
//import ContextoUsuario from "../registeredUser";
import { useWebsocket } from "../registeredUser2";
//import "./card.css";

export const Navbar = props => {
	let history = useHistory();
	//const usuario = useContext(ContextoUsuario);
	//console.log("navbar user:", usuario);
	//usuario.response.client
	const { data } = useWebsocket(); //useContext(ContextUser);
	console.log("navbar user:", data.client);

	return(
		<nav className="navbar navbar-expand-lg navbar-light bg-danger">
  	<div className="container-fluid">
			<button className="btn btn-danger text-white col-sm-1" onClick={() => history.goBack()}>{"<"}</button>
  	  <a className="navbar-brand text-white">App Midex</a>
			<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
			</ul>
			<ul className="navbar-nav navbar-right mr-auto">
				<li className="nav-item dropdown">
					<a className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
  	     	  <i className="fas fa-user"></i>
  	        <strong>{ data.client.nombre }</strong>
  	     	</a>
					<ul className="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="navbarDropdown">
						<li>
  	    			{/*<form className="d-flex">*/}
								<a className="dropdown-item">{ data.client.nombre + " " + data.client.apellido }</a>
								<a className="dropdown-item">{"Saldo: $" + Number.parseFloat(data.client.saldo).toFixed(2)}</a>
								<div className="dropdown-divider"></div>
								<Link to="/logout" className="btn text-black">Cerrar sesión</Link>
  	    			{/*</form>*/}
						</li>
					</ul>
				</li>
			</ul>
  	</div>
		</nav>
	);
}
