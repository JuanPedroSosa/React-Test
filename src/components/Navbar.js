import React, {useContext} from "react";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import ContextoUsuario from "../registeredUser";
//import "./card.css";
// <a className="navbar-brand text-white" href="#">App Midex</a>
// <Link to="/" className="btn btn-primary text-white">Cerrar</Link>
// onClick={history.goBack}
// <Link to={history.goBack} className="btn btn-primary text-white">Cerrar</Link>
export const Navbar = props => {
	let history = useHistory();
	const usuario = useContext(ContextoUsuario);
	console.log("navbar user:", usuario);
return(
	<nav className="navbar navbar-expand-lg navbar-light bg-danger">
		<button className="btn btn-danger text-white m-auto" onClick={() => history.goBack()}>{"<"}</button>
  <div className="container-fluid">
    <a className="navbar-brand text-white">App Midex</a>
		<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
			</ul>
		<ul className="navbar-nav navbar-right mr-auto">
			<li className="nav-item dropdown">
				<a className="nav-link dropdown-toggle text-white" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
       	  <i className="fas fa-user"></i>
          <strong>{usuario.response.client.nombre}</strong>
       	</a>

				<ul className="dropdown-menu dropdown-menu-right mt-2" aria-labelledby="navbarDropdown">
					<li>
      			{/*<form className="d-flex">*/}
							<a className="dropdown-item">{usuario.response.client.nombre + " " + usuario.response.client.apellido}</a>
							<a className="dropdown-item">{"Saldo: $" + Number.parseFloat(usuario.response.client.saldo).toFixed(2)}</a>
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
