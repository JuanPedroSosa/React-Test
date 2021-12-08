import React, { useState, useContext } from "react";
import Countdown, { zeroPad } from 'react-countdown';
import { Link } from "react-router-dom";
import { connServer } from "../settings";
import ContextoUsuario from "../registeredUser";
// import CryptoJS from "crypto-js";
import { Navbar } from "../components/Navbar";
import { HeaderSecondary } from "../components/HeaderSecondary";
import { QueryStringContext } from "../queryStringContext";
import { Ellipsis } from "react-awesome-spinners";
import logo from "../undraw_done_re_oak4.svg";
import logoConfirmed from "../undraw_confirmed_re_sef7.svg";
//const url = "https://app-telcon-prueba.herokuapp.com";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPIPrepago = `${url}/api/prepago`;

const MESSAGE_SERVICE = "Servicio activado - restan";
const MESSAGE_START = "Listo ya puede utilizar el servicio";
const MESSAGE_ERROR = "QR inválido";
const MESSAGE_FINISHED = "Servicio finalizado";
let MAX_TIME = 30000;

const STS_1 = 0; // inflar
const STS_2 = 1; // no inflar
const STS_3 = 2; // cuenta regresiva en espera a finalización

// <URL> + <codigoEmpresa> + <equipo> + <idEquipo> + <zona> + <version>
export const Acciones = props => {
	//const { qr } = props;
	const [isLoading, setIsLoading] = useState(false);
	const [inflar, setInflar] = useState({
		estado: STS_1,
		msg: "Listo para inflar"
	});
	const usuario = useContext(ContextoUsuario);
	console.log("u: ", usuario);
	const { queryStringQR, setQueryStringQR } = useContext(QueryStringContext);
	const [disable, setDisable] = useState(false);
	/*const query = qr.split("?");

	if (query.lenght < 2)
		console.log("Se esperan al menos 2");

	const qsDecode = CryptoJS.AES.decrypt(query[1], connServer.queryKey);
	const originalText = qsDecode.toString(CryptoJS.enc.Utf8);
	let arrQR = originalText.split("&");*/
	let arrQR = queryStringQR.split("&");

	if (arrQR.length === 0) {
		console.log("qr invalido");
		setInflar({
			estado: STS_2,
			msg: "QR inválido"
		})
	}

	console.log('url:', urlAPIPrepago, " - qr: ", queryStringQR/*originalText*/, " arrQR:", arrQR);

	let codigoEmpresa = 0;
	let idEquipo = 0;
	let posicion = "";
	let version = "";

	for (let element of arrQR) {
	  const resp = element.split("=");
		console.log("result: ", resp[0], " = ", resp[1]);
		if (resp[0] === "codigoEmpresa")
			codigoEmpresa = Number(resp[1]);
		else if (resp[0] === "idEquipo")
			idEquipo = Number(resp[1]);
		else if (resp[0] === "zona")
			posicion = resp[1];
			else if (resp[0] === "version")
			version = resp[1];
	}

	const CleanQS = () => {
		setQueryStringQR("");
	}

	const Completionist = () => (
		<>
		<img src={logo} style={{"width": 100, "height": 100}} alt="finalizado"/>
		<div className="row d-block px-3">
		<Link to="/app-midex" className="btn btn-primary btn-lg text-white text-uppercase font-weight-bold my-3 p-3" onClick={CleanQS}>Inicio</Link>
		<Link to="/logout" className="btn btn-secondary btn-lg text-white text-uppercase font-weight-bold my-3 p-3" onClick={CleanQS}>Cerrar sesión</Link>
		</div>
		</>
	);

	// Renderer callback with condition
	const renderer = ({ hours, minutes, seconds, completed }) => {
	  if (completed) {
	    // Render a completed state
	    return (<>
				<div className="container d-block justify-content-center align-items-center h-100">
				{/*<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_FINISHED}</h1></div>*/}
				<div className="row">
				<strong>{MESSAGE_FINISHED}</strong>
				</div>
				<Completionist />
				</div>
			</>); //<div className="row"><Completionist /></div>;

	  } else {
	    // Render a countdown
	    return (<>
			<div className="container d-block justify-content-center align-items-center h-100">
			{/*<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_SERVICE}</h1></div>*/}
			<div className="row">
				<strong>{MESSAGE_SERVICE}</strong>
			</div>
			<h1 style={{"font-size": "100px"}}>{zeroPad(minutes)}:{zeroPad(seconds)}</h1>
			</div>
			</>); //<div className="row"><h1 style={{"font-size": "100px"}}>{zeroPad(minutes)}:{zeroPad(seconds)}</h1></div>;
	  }
	};

	console.log("Acciones codigo: ", codigoEmpresa, " celular: ", usuario.response.client.celular, " equipo: ", idEquipo, " posicion:", posicion);
	const handleComenzar = async event => {
		event.preventDefault();
		setDisable(true);
		const data = {
			codigoEstacion: codigoEmpresa,
			nroCelular: usuario.response.client.celular,
			idEquipo: idEquipo,
			posicion: posicion,
			version: version
		}

		let infoMsg = "";
		setIsLoading(true);
		const res = await fetch(urlAPIPrepago, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify(data), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${usuario.response.jwt}`
			}
		}).then(res => res.json())
		.catch(error => {
			console.error('Error:', error);
			infoMsg = error;
			return false;
		})
		.then(response => {
			console.log('Success:', response);

			if (response && response.status === "ok") {
				//alert(response.message);
				infoMsg =	response.message;
				return true;
			}
			else {
				if (response.message) {
					console.log(response.message);
					infoMsg = `Error al procesar los datos\nDetalle: ${response.message}`;
				 }

				return false;
			}
		});

		setIsLoading(false);

		if (res) {
			setInflar({
				estado: STS_3,
				msg: infoMsg
			})
		}
		else {
			setInflar({
				estado: STS_2,
				msg: infoMsg
			})
		}
	}
	return (
	<>
	<Navbar/>
	<HeaderSecondary/>
	{ inflar.estado === STS_1 && (
		<>

		<div className="container d-block justify-content-center align-items-center h-100">
			<img src={logoConfirmed} className="m-2" style={{"width": 100, "height": 100}} alt="confirmado"/>
			<div className="row">
			<strong>{MESSAGE_START}</strong>
			</div>
			<div className="row">
			{/*<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_START}</h1></div>*/}
			<button className="btn btn-primary btn-lg text-uppercase font-weight-bold text-white text-uppercase my-3 p-3" disabled={disable} onClick={handleComenzar}>Inflar</button>
			</div>
			{ isLoading && <Ellipsis size={60} color={"#ff4d4d"}/> }
		</div>
		</>
		)
	}
	{ inflar.estado === STS_2 && (
		<div className="container d-block justify-content-center align-items-center h-100">
			<div className="row">
				<strong>{inflar.msg}</strong>
			</div>
			<div className="row">
			{/*<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{inflar.msg}</h1></div>*/}
			<Link className="btn btn-primary btn-lg text-uppercase font-weight-bold text-white text-uppercase my-3 p-3" to="/qr" onClick={CleanQS}>Escaneá nuevamente el código QR</Link>
			</div>
		</div>
	)
	}
	{ inflar.estado === STS_3 && (
		<div className="row">
		<Countdown date={Date.now() + MAX_TIME} renderer={renderer}/>
		</div>
		)
	}
	</>
	);
}
