import { useState, useEffect } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connServer } from "../settings";
import { useWebsocket } from "../registeredUser2";
import { useRef } from "react";
const modo = process.env.NODE_ENV || 'development';
//const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlWS = modo === 'development' ? `${connServer.urlWebSocket}:${connServer.port}` : `${connServer.urlWebSocket}`;
//console.log("ws: ", url);
let client = undefined; // = new W3CWebSocket(`ws://${urlWS}`); // "ws://192.168.0.15:8080"
const MAX_REINTENTOS = 10;
const delay = retryCount => new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
/**
 * Función componente y es componente React para poder colocar en el middleware
 * de eventos React y de esa manera poder leer y cambiar contexto de usuario
 */
const InitWS = () => {
	const { data, setData } = useWebsocket();// useContext(ContextUser);
	const [isOnline, setIsOnline] = useState(false);
	const [retryCount, setRetryCount] = useState(1);

	const ref = useRef(null);
	console.log(`ws: user: ${JSON.stringify(data)}`);

	useEffect(() => {
		if (!isOnline) {
			client = new W3CWebSocket(`ws://${urlWS}`);

			client.onopen = () => {
				console.log('WebSocket Client Connected');
				setIsOnline(true)
				console.log("use Effect local: " + JSON.stringify(data));
			};

			client.onmessage = (message) => {
				try {
				const dataFromServer = JSON.parse(message.data);
				//const stateToChange = {};
				console.log("from server: " + dataFromServer);
				console.log("local: " +JSON.stringify(data));
				if (dataFromServer !== undefined && dataFromServer.id === data.client.id) {
					const p = data.client;
					p.saldo = dataFromServer.saldo;
					console.log("ws id == id " + p);
					setData({...data, client: p}); // {...data, client: p} == {jwt: data.jwt, client: p}
					//ref.current.click();
				}
				}
				catch(err) {
					console.log("ws error: ", err);
				}
			}

			client.onclose = async (e) => {
				console.log(`error: ${e}`)
				if (retryCount > MAX_REINTENTOS)
					return;
				await delay(retryCount);
				setRetryCount(retryCount + 1);
				console.log(`reintento: ${retryCount}`)
				setIsOnline(false)
			}
		}
	})

	//console.log(`0.ws: user: ${JSON.stringify(data)}`);
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