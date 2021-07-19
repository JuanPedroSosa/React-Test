import React from "react";
import { Link } from "react-router-dom";

export const ServiceList = props => (
<div className="container-fluid">
	<h3>Servicios</h3>
	<ul className="list-group">
		<Link to="/inflado" className="btn btn-success text-white my-3">Inflado</Link>
		<Link to="/termo" className="btn btn-danger text-white mb-3">Termo</Link>
	  <Link to="/termo" className="btn btn-primary text-white mb-3">Lavado</Link>
	</ul>
</div>
);