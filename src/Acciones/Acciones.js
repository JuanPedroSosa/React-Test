import React, { useState } from "react";
import Countdown, {zeroPad} from 'react-countdown';
import { Link } from "react-router-dom";

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
	const [inflar, setInflar] = useState(false);

	const handleComenzar = comenzar => {
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
