import React from "react";
import Countdown, {zeroPad} from 'react-countdown';
import { Link } from "react-router-dom";

const Completionist = () => <Link to="/app-midex" className="btn btn-primary text-white">Inicio</Link>;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a completed state
    return <div className="row"><Completionist /></div>;
  } else {
    // Render a countdown
    return <div className="row"><h1 style={{"font-size": "100px"}}>{zeroPad(minutes)}:{zeroPad(seconds)}</h1></div>;
  }
};

export const Acciones = props => (
	<div className="container d-block justify-content-center align-items-center h-100">
		<div className="row">
		<button className="btn btn-primary text-uppercase font-weight-bold text-white">Inflar</button>
		</div>
		<div className="row">
		<Countdown date={Date.now() + 5000} renderer={renderer}/>
		</div>
	</div>
);

