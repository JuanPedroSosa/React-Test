import React from "react";
import { Card } from "../components/Card";
// import {NavbarSecondary} from "../components/NavbarSecondary";
import inflador from "../inflador.png";
// <div className="container-fluid">
export const TireInflator = props => (
	<>
	{/*<NavbarSecondary/>*/}
	<div className="container d-flex justify-content-center align-items-center h-100">
		<div className="row">
		<Card title="Inflado" text="Usted está comprando un servicio de inflado" imageSource={inflador} url={"/app-midex"}/>
		</div>
	</div>
	</>

);