import React, { useState, useContext } from "react";
import Countdown, {zeroPad} from 'react-countdown';
import { Link } from "react-router-dom";
import APIServerContext, {connServer} from "../settings";
import ContextoUsuario from "../registeredUser";
//const url = "https://app-telcon-prueba.herokuapp.com";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPIPrepago = `${url}/api/prepago`;

const MESSAGE_SERVICE = "Servicio activado - restan";
const MESSAGE_START = "Puede comenzar, presione el botón"
const MESSAGE_FINISHED = "Servicio finalizado"
let MAX_TIME = 30000;

const Completionist = () => <Link to="/app-midex" className="btn btn-primary btn-lg text-white text-uppercase font-weight-bold my-3">Inicio</Link>;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <><div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_FINISHED}</h1></div><Completionist /></>; //<div className="row"><Completionist /></div>;
  } else {
    // Render a countdown
    return <><div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_SERVICE}</h1></div><h1 style={{"font-size": "100px"}}>{zeroPad(minutes)}:{zeroPad(seconds)}</h1></>; //<div className="row"><h1 style={{"font-size": "100px"}}>{zeroPad(minutes)}:{zeroPad(seconds)}</h1></div>;
  }
};

export const Acciones = props => {
	const { qr } = props;
	const [inflar, setInflar] = useState(false);
	const usuario = useContext(ContextoUsuario);
	console.log("u: ", usuario);

	console.log('url:', urlAPIPrepago, " - qr: ", qr, " props:", props);
	const arrQR = qr.split(",");

	if (arrQR.lenght <= 0)
		console.log("qr invalido");

	let codigoEmpresa = 0;
	let idServicio = 0;
	let idPosicion = 0;
	for (let element of arrQR) {
	  const resp = element.split("=");
		console.log("result: ", resp[0], " = ", resp[1]);
		if (resp[0] === "codigoEmpresa")
			codigoEmpresa = Number(resp[1]);
		else if (resp[0] === "idServicio")
			idServicio = Number(resp[1]);
		else if (resp[0] === "idPosicion")
			idPosicion = Number(resp[1]);
	}

	console.log("codigo: ", codigoEmpresa, " celular: ", usuario.response.client.celular, " servicio: ", idServicio, " posicion:", idPosicion);
	const handleComenzar = async comenzar => {
		const data = {
			codigoEstacion: codigoEmpresa,
			nroCelular: usuario.response.client.celular,
			idServicio: idServicio,
			idPosicion: idPosicion
		}

		await fetch(urlAPIPrepago, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${usuario.response.jwt}`
			}
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
			console.log('Success:', response);
			alert(response);
		});

		setInflar(true);
	}
	return (
	<>
	{ inflar === false &&
		<div className="container d-block justify-content-center align-items-center h-100">
			<div className="row">
			<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_START}</h1></div>
			<button className="btn btn-primary btn-lg text-uppercase font-weight-bold text-white text-uppercase my-3" onClick={handleComenzar}>Inflar</button>
			</div>
		</div>
	}
	{ inflar && <div className="row">
		<Countdown date={Date.now() + MAX_TIME} renderer={renderer}/>
		</div>
	}
	</>
	);
}
