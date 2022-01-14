import { connServer } from "../settings";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPIPrepago = `${url}/api/prepago`;
const urlAPISessions = `${url}/api/sessions/client`;
const urlAPIClientes = `${url}/api/clientes`;

export const requestAuthorization = async (req) => {
	//console.log("objs:", objs);
	console.log("requestAuthorization:", urlAPIPrepago, " data: ", req.regData, " jwt: ", req.jwt);
	const data = await fetch(urlAPIPrepago, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(req.regData), // data can be `string` or {object}!
		headers:{
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${req.jwt}`
			//'Authorization': `Bearer ${usuario.response.jwt}`
		}
	});
	return data.json();
}

export const requestLogin = async (regData) => {
	console.log("requestLogin:", urlAPISessions, " data: ", regData);
	const data = await fetch(urlAPISessions, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify({
			"celular": regData, // puede ir el correo o el celular
		}), // data can be `string` or {object}!
		headers:{
			'Content-Type': 'application/json'
		}
	});
	return data.json();
}

export const requestRegister = async (regData) => {
	console.log("requestRegister:", urlAPIClientes, " data: ", regData);
	const data = await fetch(urlAPIClientes, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(regData), // data can be `string` or {object}!
		headers:{
			'Content-Type': 'application/json'
		}
	});
	return data.json();
}