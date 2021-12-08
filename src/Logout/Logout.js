import React from "react";
import { Redirect } from "react-router-dom";

export const Logout = props => {
	props.setAutorizado(false);

	return <Redirect to="/"/>
}