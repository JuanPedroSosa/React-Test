import React from "react";
import { Link } from "react-router-dom";

export const Navbar = props => (
	<nav className="navbar navbar-expand-lg navbar-light bg-danger">
  <div className="container-fluid">
    <a className="navbar-brand text-white" href="#">App Midex</a>

      <form className="d-flex">
				<Link to="/" className="btn btn-primary text-white">Cerrar</Link>
      </form>

  </div>
</nav>
);

