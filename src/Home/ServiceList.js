import React from "react";
import { Link } from "react-router-dom";

export const ServiceList = props => (
<>
<h3 style={{"background": "#ff4d4d", width: "100%"}} className="font-weight-bold text-white">Servicios</h3>
<div className="container-fluid">
	<ul className="list-group">
		<Link to="/inflado" className="btn btn-success text-white text-uppercase font-weight-bold my-3">Inflado</Link>
		<Link to="/termo" className="btn btn-danger text-white text-uppercase font-weight-bold mb-3">Termo</Link>
	  <Link to="/termo" className="btn btn-primary text-white text-uppercase font-weight-bold mb-3">Lavado</Link>
	</ul>
</div>
</>
);