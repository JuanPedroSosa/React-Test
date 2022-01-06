import React, { useState, useMemo } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
//import logo from './logo.svg';
//import inflador from "./MP300PR_AMARILLO.jpg";
import './App.css';
//import { MainBanner } from "./components/MainBanner";
import LoginForm from "./Login/LoginForm";
import ResetPasswordForm from "./ResetPassword/ResetPasswordForm";
//import {Navbar} from "./components/Navbar";
import { ServiceList } from "./Home/ServiceList";
import { TireInflator } from "./TireInflator/TireInflator";
import { Thermos } from "./Thermos/Thermos";
import QrContainer from "./ReaderQR/ReaderQR";
import { Acciones } from "./Acciones/Acciones";
import PageError from './PageError/PageError';
import APIServerContext, { connServer } from "./settings";
//import { ProviderUsuario } from "./registeredUser";
import { ContextUser } from "./registeredUser2";
import { Logout } from "./Logout/Logout";
// import { ProviderQueryStringQR } from "./queryStringQR";
import { QueryStringContext } from "./queryStringContext";
import { useCookies, CookiesProvider } from "react-cookie";
import InitWS from "./services/WebSockets";

const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPISessions = `${url}/api/sessions/client`;
console.log("Modo: ", process.env.NODE_ENV, "1. URL:", urlAPISessions);

function App() {
	const [token, setToken] = useState("");
	const [state, setState] = useState({});
	const [data, setData] = useState({});
	const [info, setInfo] = useState("");
	const [autorizado, setAutorizado] = useState(false);
	const [queryStringQR, setQueryStringQR] = useState("");
	const [cookies, setCookie] = useCookies(["username", "password"]);

	const qsValue = useMemo(
    () => ({ queryStringQR, setQueryStringQR }),
    [queryStringQR]
	);

	/**
	 * Datos del usuario/cliente que inició la sesión
	 */
	const user = useMemo(
    () => ({ data, setData }),
    [data]
  );

	// websocket
	//InitWS();
	//const { token, setToken } = useToken();
// ver validar celular token
	/*useEffect(() => {
		const query = window.location.search.substring(1);
		if (query !== undefined) {
			console.log(query);
			const qsDecode = CryptoJS.AES.decrypt(query, connServer.queryKey);
			const originalText = qsDecode.toString(CryptoJS.enc.Utf8);
			setQueryStringQR(originalText);
			console.log("App qs: ", queryStringQR);
		}
		else setQueryStringQR("");
	},[queryStringQR]);*/

	/**
	 * HandleAddUsers recibe los datos del usuario/cliente que inicia la sesión
	 * Luego se realiza un solicitud POST con el nro celular o correo
	 * Si la autenticación es correcta el servidor responde con los datos del cliente
	 * mas el token que será utilizado para realizar cualquier operación contra
	 * el servidor
	 * @param {*} usuario
	 */
	const handleAddUsers = async usuario => {
		console.log(`sesion iniciada por users: ${usuario}`);
		try {
		await fetch(urlAPISessions, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				"celular": usuario.username, // puede ir el correo o el celular
				}), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.catch(error => {
			console.log('Error:', error);
			setInfo("Usuario o contraseña incorrecta"); // + urlAPISessions
			setAutorizado(false);
		} )
		.then(response => {
			console.log('Response session Success:', response);
			if (response !== undefined && response.status !== "error") {
				console.log("usuario ingresado:", response);
				setState({...state, response});
				//setData(response.client);
				setData({client: response.client, jwt: response.jwt});
				setToken(response.jwt);
				setInfo("");
				setAutorizado(true);
				console.log("usuario recordar?:",usuario.remember);
				if (usuario.remember) {
					setCookie("username", usuario.username, {"path": "/"});
					setCookie("password", usuario.password, {"path": "/"});
				}

			}
			else {
				if (response !== undefined && response.message)
					console.log("err autenticacion:",  response.message);
				setInfo("Usuario o contraseña incorrecta"); //  + urlAPISessions
				setAutorizado(false);
			}
		});
		}
		catch (err) {
			setInfo(err); //  + urlAPISessions
			setAutorizado(false);
		}
	}

	//console.log("QS:" + props.location.search);
	console.log("cookies: ", cookies.username, " ", cookies.password);
	console.log("verifico: " + token);
  //if (!autorizado/*!token*/) {
  //  return <LoginForm onAddUsers={handleAddUsers} msg={info}/>
	//}
	console.log("listo: " + token);
	console.log("state: ", state);
	console.log("data: ", data);
// <ContextUser.Provider value={{data, setData}}>
  return (
		<APIServerContext.Provider value={connServer} token={token}>
		{/*<ProviderUsuario value={state}>*/}
		<ContextUser.Provider value={user}>
		<QueryStringContext.Provider value={qsValue}>
		<CookiesProvider>
		<InitWS/>
		{/*<ProviderQueryStringQR value={queryStringQR}>*/}
		<BrowserRouter>
    	<div className="App">
			{/*<Redirect
      	from="/"
			to="/app-midex" />*/}
			{/*!autorizado && <LoginForm onAddUsers={handleAddUsers} msg={info}/>*/}

			{/*<Redirect
			from="/"
			to="/app-midex" />*/}
	  	<Switch>
			<Route
					path="/"
					exact
				>
			{!autorizado ? <LoginForm onAddUsers={handleAddUsers} msg={info} cookies={cookies}/> : <Redirect push to="/app-midex"/>}
			</Route>
				<Route
					path="/app-midex"
					exact
				>
				{autorizado && <ServiceList/>}
				</Route>
				{/*<Route
					path="/"
					exact>
	 				{!autorizado && <LoginForm onAddUsers={handleAddUsers} msg={info}/>}
				</Route>*/}
				<Route
					exact
      	  path="/inflado"
      	>
					<TireInflator/>
				</Route>
				<Route
      	  path="/termo"
      	>
					{autorizado && <Thermos/>}
				</Route>
				<Route
					exact
					path="/qr"
				>
					{autorizado && <QrContainer/>}
				</Route>
				<Route
					exact
      	  path="/acciones"
				>
				{autorizado && <Acciones/>}
				</Route>
				{/*<Route
				path="/"
				render={(props) => (
					<LoginForm {...props} onAddUsers={handleAddUsers} msg={info}/>
				)} />*/}
				<Route
      	  path="/forgot"
				>
					<ResetPasswordForm/>
				</Route>
				<Route
					path="/logout"
					exact
				>
				<Logout setAutorizado={setAutorizado}/>
				</Route>
				{/*<Route component={() => setAutorizado(false) && <Redirect to="/" />} />*/}

      	<Route component={PageError} />
			</Switch>

			</div>
		</BrowserRouter>
		</CookiesProvider>
		</QueryStringContext.Provider>
		</ContextUser.Provider>
		{/*</ProviderUsuario>*/}
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