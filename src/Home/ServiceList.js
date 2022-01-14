import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar";
//import ContextoUsuario from "../registeredUser";
//import ContextoQueryStringQR from "../queryStringQR";
import { QueryStringContext } from "../queryStringContext";
import { TireInflator } from "../TireInflator/TireInflator";
import logo from "../midexqr.svg";
import { HeaderSecondary } from "../components/HeaderSecondary";
export const ServiceList = props => {
	//const usuario = useContext(ContextoUsuario);
	//const qs = useContext(ContextoQueryStringQR);
	const { queryStringQR } = useContext(QueryStringContext);
	console.log("servicelist QS: ", queryStringQR);
	return (
		<>
		<Navbar/>
		<HeaderSecondary/>
		{/*<div className="row d-flex" style={{"background": "#ff4d4d"}}>
			<div className="col">
			<h5 className="font-weight-bold text-white">Servicios</h5>
			</div>
			<div className="col">
			<h5 className="font-weight-bold text-white">Saldo: ${Number.parseFloat(usuario.response !== undefined ? usuario.response.client.saldo : 0).toFixed(2)}</h5>
			</div>
	</div>*/}
		{ queryStringQR.trim() !== "" && <TireInflator/>}
		{ queryStringQR.trim() === "" && (<div className="container-fluid">
			<div className="row align-items-center">
			<strong className="mx-auto d-block pt-2" >Acercate al equipo y escaneá el código QR</strong>
			</div>
			<div className="row align-items-center">
			<img src={logo} className="mx-auto d-block" style={{height: "20%", width:"30%"}} alt="qr code"/>
			</div>
			<div className="row d-block px-3">
			<Link to="/qr" className="btn btn-primary text-white text-uppercase font-weight-bold p-3">Escaneá código QR</Link>
			</div>
		</div>)}
		{/*
		{ qs === undefined && (<div className="container-fluid">
			<ul className="list-group">
				<Link to="/inflado" className="btn btn-success text-white text-uppercase font-weight-bold my-3">Inflado</Link>
				<Link to="/termo" className="btn btn-danger text-white text-uppercase font-weight-bold mb-3">Termo</Link>
			  <Link to="/termo" className="btn btn-primary text-white text-uppercase font-weight-bold mb-3">Lavado</Link>
			</ul>
		</div>)}
		*/}
		</>
);
}