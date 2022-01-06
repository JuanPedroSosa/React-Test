import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const NavbarSecondary = props => {
	let history = useHistory();

	return(
		<nav className="navbar navbar-expand navbar-light bg-danger">
		<button className="btn btn-danger text-white m-auto" onClick={() => history.goBack()}>{"<"}</button>
	  <div className="container">
			<a className="navbar-brand text-white">App Midex</a>
	  </div>
		<Link to="/app-midex" className="btn btn-danger text-white m-auto">Menú</Link>
		</nav>
	);
}
