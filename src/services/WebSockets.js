//import { useContext } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connServer } from "../settings";
import { useWebsocket } from "../registeredUser2";
import { useRef } from "react";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
console.log("ws: ", url);
const client = new W3CWebSocket("ws://192.168.0.15:8080");
/**
 * Función componente y es componente React para poder colocar en el middleware
 * de eventos React y de esa manera poder leer y cambiar contexto de usuario
 */

const InitWS = () => {
	const { data, setData } = useWebsocket();// useContext(ContextUser);
	const ref = useRef(null);
	console.log(`1.ws: user: ${data.client}`);
	//usuario.setData({"response.cliente.saldo": 12});
	//const populateSaldo = () => {
	//	console.log("nuevo Saldo:", data.client);
	//	//setData(data);
	//}

	client.onopen = () => {
		console.log('WebSocket Client Connected');
	};

	client.onmessage = (message) => {
		const dataFromServer = JSON.parse(message.data);
		//const stateToChange = {};
		console.log(dataFromServer);
		if (dataFromServer !== undefined && dataFromServer.id === data.client.id) {

			const p = data.client;
			p.saldo = dataFromServer.saldo;
			console.log("ws id == id " + p);
			setData({...data, client: p}); // {...data, client: p} == {jwt: data.jwt, client: p}
			//ref.current.click();
		}

		//console.log(`ws: user: ${JSON.stringify(usuario.data)}`);
		//if (dataFromServer.saldo !== undefined) {
		//	const ele = document.getElementById("id");
		//}
		//if (dataFromServer.type === "userevent") {
		//	stateToChange.currentUsers = Object.values(dataFromServer.data.users);
		//} else if (dataFromServer.type === "contentchange") {
		//	stateToChange.text = dataFromServer.data.editorContent || contentDefaultMessage;
		//}
		//stateToChange.userActivity = dataFromServer.data.userActivity;
		//this.setState({
		//	...stateToChange
		//});
	};

	//const changeHandler = event => setData({id:5, saldo: 15});
	console.log(`0.ws: user: ${JSON.stringify(data)}`);
	/** Frament + elemento (div) solo con el fin de hacer una función componente React
	 *  Siendo un componente forma parte del render react ante cualquier cambio
	 */
	//return(<><div hidden><p hidden={isEnabled}>{data.saldo}</p></div></>)
	return(
		<div ref={ref} onClick={()=> console.log("webSockets")}></div>
	)
	//return(
	//	<div ref={ref} onClick={()=> populateSaldo()}></div>
	//)
}

export default InitWS;