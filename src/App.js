import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import { MainBanner } from "./components/MainBanner";
import LoginForm from "./Login/LoginForm";
import {Navbar} from "./components/Navbar";
import {ServiceList} from "./Home/ServiceList";
import {TireInflator} from "./TireInflator/TireInflator";
import {Thermos} from "./Thermos/Thermos";
import QrContainer from "./ReaderQR/ReaderQR";
import PageError from './PageError/PageError';
import useToken from './useToken';

function App() {
	const [username, setUserName] = useState(""); // Hook
	const [password, setPassword] = useState("");
	//const [token, setToken] = useState();
	const { token, setToken } = useToken();

	const handleAddUsers = usuario => {
		console.log(`add users: ${usuario}`);
		setUserName(usuario.username);
		setPassword(usuario.password);
	}

	console.log("verifico: " + token);
  //if(!token) {
  //  return <LoginForm setToken={setToken} onAddUsers={handleAddUsers}/>
	//}
	console.log("listo" + token);
// <LoginForm onAddUsers={handleAddUsers}/>
// <MainBanner userName={username} keys={token}/>
  return (
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
  );
}

export default App;
