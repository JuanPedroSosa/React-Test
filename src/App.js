import React, { useState, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import inflador from "./MP300PR_AMARILLO.jpg";
import './App.css';
//import { MainBanner } from "./components/MainBanner";
import LoginForm from "./Login/LoginForm";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
//import {Navbar} from "./components/Navbar";
import {ServiceList} from "./Home/ServiceList";
import {TireInflator} from "./TireInflator/TireInflator";
import {Thermos} from "./Thermos/Thermos";
import QrContainer from "./ReaderQR/ReaderQR";
import {Acciones} from "./Acciones/Acciones";
import PageError from './PageError/PageError';
import APIServerContext, {connServer} from "./settings";
import {ProviderUsuario} from "./registeredUser";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPISessions = `${url}/api/sessions/client`;

function App() {
	const [username, setUserName] = useState(""); // Hook
	const [password, setPassword] = useState("");
	const [token, setToken] = useState("");
	const [state, setState] = useState({});
	const [info, setInfo] = useState("");
	const [autorizado, setAutorizado] = useState(false);
	//const { token, setToken } = useToken();
// ver validar celular token
	const handleAddUsers = usuario => {
		console.log(`add users: ${usuario}`);
		setUserName(usuario.username);
		setPassword(usuario.password);
		fetch(urlAPISessions, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				"celular": usuario.username,
				}), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
			console.log('Response session Success:', response);
			if (response !== undefined && response.status !== "error") {
				console.log("usuario ingresado:", response);
				setState({...state, response});
				setToken(response.jwt);
				setInfo("");
			}
			else {
				if (response.message)
					console.log("err autenticacion:",  response.message);
				setInfo("Usuario o contraseña incorrecta");
				//new Error("Token no encontrado");
			}
		});
	}

	console.log("verifico: " + token);
  if (!token) {
    return <LoginForm onAddUsers={handleAddUsers} msg={info}/>
	}
	console.log("listo: " + token);
	console.log("state: ", state);
// <LoginForm onAddUsers={handleAddUsers}/>
// <MainBanner userName={username} keys={token}/>
  return (
		<APIServerContext.Provider value={connServer} token={token}>
			<ProviderUsuario value={state}>
		<BrowserRouter>
    	<div className="App">
			{/*<Navbar userName={username} keys={"1"}/>*/}

			<Redirect
      	from="/"
        to="/app-midex" />
	  	<Switch>
				<Route
      	  path="/app-midex"
      	  component={ServiceList} />
				<Route
					exact
      	  path="/inflado"
      	  component={TireInflator} />
				<Route
      	  path="/termo"
      	  component={Thermos} />
				<Route
      	  path="/qr"
      	  component={QrContainer} />
				<Route
				path="/login"
				render={(props) => (
					<LoginForm {...props} onAddUsers={handleAddUsers} msg={info}/>
				)} />
				<Route
      	  path="/forgot"
      	  component={ResetPasswordForm} />
				{/*<Route
      	  path="/acciones"
				component={Acciones} />*/}
      	<Route component={PageError} />
			</Switch>

			</div>
		</BrowserRouter>
		</ProviderUsuario>
		</APIServerContext.Provider>
  );
}


export default App;

/*
		<BrowserRouter>
    	<div className="App">
			<Navbar userName={username} keys={token}/>
			<Redirect
      	from="/"
        to="/app-midex" />
			<Switch>
			<Route
        path="/app-midex"
        component={ServiceList} />
			<Route
        path="/inflado"
        component={TireInflator} />
			<Route
        path="/termo"
        component={Thermos} />
			<Route
        path="/qr"
        component={QrContainer} />
      <Route component={PageError} />
			</Switch>
			</div>
		</BrowserRouter>

*/