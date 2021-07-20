import React from "react";
import { Redirect, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// <a className="navbar-brand text-white" href="#">App Midex</a>
// <Link to="/" className="btn btn-primary text-white">Cerrar</Link>
export const Navbar = props => {
	let history = useHistory();

return(
	<nav className="navbar navbar-expand-lg navbar-light bg-danger">
  <div className="container-fluid">
    <a className="navbar-brand text-white">App Midex</a>

      <form className="d-flex">
			<button onClick={history.goBack} className="btn btn-primary text-white">Cerrar</button>

      </form>

  </div>
</nav>
);
}
