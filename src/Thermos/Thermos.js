import React from "react";
import { Card } from "../components/Card";
import {NavbarSecondary} from "../components/NavbarSecondary";
import termo from "../termo.png";
export const Thermos = props => (
	<>
	<NavbarSecondary/>
	<div className="container d-flex justify-content-center align-items-center h-100">
		<div className="row">
		<Card title="Termo" text="Usted está comprando un servicio de termo" imageSource={termo} url={"/app-midex"}/>
		</div>
	</div>
	</>
);