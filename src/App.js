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
import { CookiesProvider } from "react-cookie";
import InitWS from "./services/WebSockets";
//import { requestLogin } from "./api/serverQuery";

//const modo = process.env.NODE_ENV || 'development';
//const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
//const urlAPISessions = `${url}/api/sessions/client`;
//console.log("Modo: ", process.env.NODE_ENV, "1. URL:", urlAPISessions);

function App() {
	//const [token, setToken] = useState("");
	//const [state, setState] = useState({});
	const [data, setData] = useState({});
	//const [info, setInfo] = useState("");
	const [autorizado, setAutorizado] = useState(false);
	const [queryStringQR, setQueryStringQR] = useState("");
	//const [cookies, setCookie] = useCookies(["username", "password"]);

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
	 * handleLogin recibe los datos del usuario/cliente que inicia la sesión
	 * Luego se realiza un solicitud POST con el nro celular o correo
	 * Si la autenticación es correcta el servidor responde con los datos del cliente
	 * mas el token que será utilizado para realizar cualquier operación contra
	 * el servidor
	 * @param {*} usuario
	 */
	const handleLogin = async usuario => {
		console.log(`sesion iniciada por users: ${usuario}`);
/*
		try {
			const req = await requestLogin(usuario.username);
			console.log("requestLogin: ", req);
			if (req !== undefined && req.status !== "error") {
				console.log("usuario ingresado:", req);
				setState({...state, req});
				//setData(response.client);
				setData({client: req.client, jwt: req.jwt});
				//setToken(req.jwt);
				setInfo("");
				setAutorizado(true);
				console.log("usuario recordar?:",usuario.remember);
				if (usuario.remember) {
					setCookie("username", usuario.username, {"path": "/"});
					setCookie("password", usuario.password, {"path": "/"});
				}

			}
			else {
				if (req !== undefined && req.message)
					console.log("err autenticacion:",  req.message);
				setInfo("Usuario o contraseña incorrecta"); //  + urlAPISessions
				setAutorizado(false);
			}
		}
		catch (err) {
			// error de fetch devuelve un object y lo paso el string para mostrarlo en un alert
			let error = err.toString();
			if (error.toLowerCase().search("networkerror") !== -1)
				error = "Sin conexión";

			setInfo(error);
			setAutorizado(false);
		}
		*/
	}


	//console.log("cookies: ", cookies.username, " ", cookies.password);
	//console.log("state: ", state);
	console.log("data: ", data);
	console.log("autorizado: ", autorizado);
	console.log("1.qr leido: ", qsValue);
	console.log("2.qr leido: ", queryStringQR);
// <ContextUser.Provider value={{data, setData}}>
//token={token}
  return (
		<APIServerContext.Provider value={connServer} >
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
			{/*!autorizado && <LoginForm onAddUsers={handleLogin} msg={info}/>*/}

			{/*<Redirect
			from="/"
			to="/app-midex" />*/}
	  	<Switch>
			<Route
					path="/"
					exact
				>
			{/*!autorizado ? <LoginForm onUserLogin={handleLogin} msg={info} cookies={cookies}/> : <Redirect push to="/app-midex"/>*/}
			{!autorizado ? <LoginForm setQueryStringQR={setQueryStringQR} setData={setData} setAutorizado={setAutorizado} /> : <Redirect push to="/app-midex"/>}
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
	 				{!autorizado && <LoginForm onAddUsers={handleLogin} msg={info}/>}
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
					<LoginForm {...props} onAddUsers={handleLogin} msg={info}/>
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