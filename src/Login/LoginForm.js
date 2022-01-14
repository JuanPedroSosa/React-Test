import React, {useEffect, useState} from 'react';
import CryptoJS from "crypto-js";
import ResetPasswordForm from "../ResetPassword/ResetPasswordForm";
import { RegisterForm } from "../Register/RegisterForm";
import { connServer } from "../settings";
//import { withCookies, Cookies } from "react-cookie";
//import { Ellipsis } from "react-awesome-spinners";
import { useCookies } from "react-cookie";
//import { requestLogin } from "../api/serverQuery";
import "./login.css";
import { useMutateLogin } from '../services/apiServices';

const LoginForm = ({setQueryStringQR, setData, setAutorizado}) => {
	//const { cookies, onUserLogin } = props;
	const [cookies, setCookie] = useCookies(["username", "password"]);
	const [state, setState] = useState({
		username: cookies.username || "", // cookies.get("username")
		password: cookies.password || "", // cookies.get("password")
		forgot: false,
		register: false,
		remember: false,
		isLoading: false
	})
	const [msg, setMsg] = useState("");
	console.log("login cookies: ", cookies);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const {mutate, isLoading} = useMutateLogin();

	useEffect(() => {
		const query = window.location.search.substring(1);
		if (query !== undefined) {
			console.log("login form useEffect: ", query);
			let qsDecode = CryptoJS.AES.decrypt(query, connServer.queryKey);
			let originalText = qsDecode.toString(CryptoJS.enc.Utf8);
			setQueryStringQR(originalText);
		}
		else setQueryStringQR("");
		//console.log("Login qs: ", this.context.queryStringQR);
	});

	const handleInput = (e) => {
		console.log("event: " + e.target.name, e.target.value);
		const {name, value} = e.target;
		setState({ ...state,
			[name] : value
		})
	}

	const handleOlvidasteClave = () => {
		setState({...state, forgot: true, register: false})
	}

	const handleRegistrarse = () => {
		console.log("estoy en registarte");
		setState({...state, register: true, forgot: false})
	}

	const handleLogin = () => {
		console.log("estoy en login");
		setState({...state, register: false, forgot: false})
	}

	const handleRemember = (e) => {
		const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    setState({...state,
			"remember": value
		});
	}

	const handleSubmit = async (e) => {
		setState({...state, isLoading: true});
		// evita que se refresque la pantalla
		e.preventDefault();
		console.log(`login submit: ${state.username}`);
		//onUserLogin(state);
		mutate(state.username, {
			onSuccess: (data) => {
				console.log(`requestLogin: Datos del servidor (${data})`);
				if (data !== undefined && data.status !== "error") {
					// console.log("usuario ingresado:", data);
					setState({...state, data});
					setData({client: data.client, jwt: data.jwt});
					setMsg("");
					setAutorizado(true);
					console.log("usuario recordar?:",state.remember);
					if (state.remember) {
						setCookie("username", state.username, {"path": "/"});
						setCookie("password", state.password, {"path": "/"});
					}

				}
				else {
					if (data !== undefined && data.message)
						console.log("err autenticacion:", data.message);
					setMsg("Usuario o contraseña incorrecta"); //  + urlAPISessions
					setAutorizado(false);
				}
			},
			onError: (err) => {
				let error = err.toString();

				if (error.toLowerCase().search("networkerror") !== -1)
					error = "Sin conexión";

				setMsg(error);
				setAutorizado(false);
				//console.log("err:", err);
				//setMsg(err.toString());
			},
			retry: connServer.retry,
		});

		//if (true)
		//return;
		/*
		try {

			const req = await requestLogin(state.username);
			console.log("requestLogin: ", req);
			if (req !== undefined && req.status !== "error") {
				console.log("usuario ingresado:", req);
				setState({...state, req});
				setData({client: req.client, jwt: req.jwt});
				setMsg("");
				setAutorizado(true);
				console.log("usuario recordar?:",state.remember);
				if (state.remember) {
					setCookie("username", state.username, {"path": "/"});
					setCookie("password", state.password, {"path": "/"});
				}

			}
			else {
				if (req !== undefined && req.message)
					console.log("err autenticacion:",  req.message);
				setMsg("Usuario o contraseña incorrecta"); //  + urlAPISessions
				setAutorizado(false);
			}
		}
		catch (err) {
			// error de fetch devuelve un object y lo paso el string para mostrarlo en un alert
			let error = err.toString();
			if (error.toLowerCase().search("networkerror") !== -1)
				error = "Sin conexión";

			setMsg(error);
			setAutorizado(false);
		}

		setState({...state, isLoading: false});
		console.log("fin login");
		*/
	}
	return (
		<>
		{state.register && <RegisterForm onLogin={handleLogin} />}
		{state.forgot === true && !state.register && <ResetPasswordForm onLogin={handleLogin}/>}
		{state.forgot === false && !state.register && <div className="container-fluid">
			<div className="row no-gutter">
				<div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
				<div className="col-md-8 col-lg-6">
					<div className="login d-flex align-items-center py-1">
						<div className="container">
							<div className="row">
								<div className="col-md-9 col-lg-8 mx-auto">
									<h3 className="login-heading mb-4"><strong>APP MIDEX</strong></h3>
									<hr/>
									<h6 className="login-heading2 mb-4">Bienvenido a la <strong>APP MIDEX</strong></h6>
									<form onSubmit={handleSubmit}>
										{/*this.props.msg && <alert className="alert alert-warning fade show mb-1" role="alert">{this.props.msg}</alert>*/}
										{msg && <div className="alert alert-warning fade show" role="alert">
											<strong>{msg.toString()}</strong>
											</div>
										}
										{/*this.props.msg && <div className="alert alert-warning alert-dismissible fade show" role="alert">
											<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
											<strong>{this.props.msg}</strong>
										</div>*/}
										<div className="form-label-group">
											<input
											autoFocus
											name="username"
											onChange= {handleInput} // {(event, newValue) => this.setState({username:newValue})}
											className="form-control"
											placeholder="correo / número de celular"
											type="text" id="inputEmail"
											value={state.username}
											required></input>
											<label htmlFor={"inputEmail"}>Ingrese correo o número celular</label>
										</div>

										<div className="form-label-group">
											<input
											type="password"
											name="password"
											onChange= {handleInput} // {(event, newValue) => this.setState({password:newValue})}
											className="form-control"
											placeholder="clave"
											id="inputPassword"
											value={state.password}
											required>
											</input>
											<label htmlFor={"inputPassword"}>Ingrese la contraseña</label>
										</div>

										<div className="custom-control custom-checkbox mb-3">
											<input type={"checkbox"} className="custom-control-input" id="customCheck1" checked={state.remember} onChange={handleRemember}></input>
											<label className="custom-control-label" >Recordar</label>
										</div>
										<div>
										{  }
										</div>
										<button disabled={isLoading} className="btn btn-lg btn-primary btn-block btn-login font-weight-bold mb-2 w-100" type="submit">
											{isLoading ? (
											<>
											 <span className="spinner-border spinner-border-sm"></span>{" "}
											 Ingresando ...
											{/*text-uppercase<Ellipsis size={25} color={"#ff4d4d"}/>*/}
											</>
											) : ("Ingresar")
											}
										</button>
										<div className="text-center">
										{/*<Link to={"/restablecerClave"} className="small">¿Olvidaste tu contraseña?</Link>*/}
											<a className="small" onClick={handleOlvidasteClave} href="javascript:void(0)">¿Olvidaste tu contraseña?</a>
										</div>
										<br/>
										<button className="btn btn-lg btn-success btn-block btn-login font-weight-bold mb-2 w-100" onClick={handleRegistrarse} type="button">Crear una cuenta</button>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		}
		</>
	)
}

export default LoginForm;
//class LoginForm2 extends Component {
//	static contextType = QueryStringContext;
//	/*static propTypes = {
//    cookies: instanceOf(Cookies).isRequired
//  };*/
//	constructor(props) {
//		super(props);
//		const { cookies } = props;
//		console.log("login cookies: ", cookies);
//		this.state = {
//			username: cookies.username || "", // cookies.get("username")
//			password: cookies.password || "", // cookies.get("password")
//			forgot: false,
//			register: false,
//			remember: false,
//			isLoading: false
//		}
//		// React pierde el scope this, entonces con bind le decimos a la
//		// clase que pertenece
//		this.handleInput = this.handleInput.bind(this);
//		this.handleSubmit = this.handleSubmit.bind(this);
//		this.handleOlvidasteClave = this.handleOlvidasteClave.bind(this);
//		this.handleRegistrarse = this.handleRegistrarse.bind(this);
//		this.handleLogin = this.handleLogin.bind(this);
//		this.handleRemember = this.handleRemember.bind(this);
//		this.msg = this.props.msg;
//	}
//
//	componentDidMount() {
//		const query = window.location.search.substring(1);
//		if (query !== undefined) {
//			console.log(query);
//			const qsDecode = CryptoJS.AES.decrypt(query, connServer.queryKey);
//			const originalText = qsDecode.toString(CryptoJS.enc.Utf8);
//			this.context.setQueryStringQR(originalText);
//		}
//		else this.context.setQueryStringQR("");
//		console.log("Login qs: ", this.context.queryStringQR);
//	}
//
//	componentDidUpdate() {
//	}
//
//	handleInput (e) {
//		console.log("event: " + e.target.name, e.target.value);
//		const {name, value} = e.target;
//		this.setState({
//			[name] : value
//		})
//	}
//
//	handleOlvidasteClave () {
//		this.setState({forgot: true, register: false})
//	}
//
//	handleRegistrarse () {
//		console.log("estoy en registarte");
//		this.setState({register: true, forgot: false})
//	}
//
//	handleLogin () {
//		console.log("estoy en login");
//		this.setState({register: false, forgot: false})
//	}
//
//	handleRemember(e) {
//		const target = e.target;
//    const value = target.type === 'checkbox' ? target.checked : target.value;
//    // const name = target.name;
//    this.setState({
//			"remember": value
//		});
//	}
//
//	async handleSubmit(e) {
//		this.setState({isLoading: true});
//		// evita que se refresque la pantalla
//		e.preventDefault();
//		console.log(`login submit: ${this.state.username}`);
//		this.props.onUserLogin(this.state);
//		this.setState({isLoading: false});
//		console.log("fin login");
//	}
//
//	render() {
//		console.log("login form error:", this.props.msg, " type:", typeof this.props.msg);
//		return (
//			<>
//			{this.state.register && <RegisterForm onLogin={this.handleLogin} />}
//			{this.state.forgot === true && !this.state.register && <ResetPasswordForm onLogin={this.handleLogin}/>}
//			{this.state.forgot === false && !this.state.register && <div className="container-fluid">
//			  <div className="row no-gutter">
//			    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
//			    <div className="col-md-8 col-lg-6">
//			      <div className="login d-flex align-items-center py-1">
//			        <div className="container">
//			          <div className="row">
//			            <div className="col-md-9 col-lg-8 mx-auto">
//			              <h3 className="login-heading mb-4"><strong>APP MIDEX</strong></h3>
//										<hr/>
//										<h6 className="login-heading2 mb-4">Bienvenido a la <strong>APP MIDEX</strong></h6>
//			              <form onSubmit={this.handleSubmit}>
//											{/*this.props.msg && <alert className="alert alert-warning fade show mb-1" role="alert">{this.props.msg}</alert>*/}
//											{this.props.msg && <div className="alert alert-warning fade show" role="alert">
//  											<strong>{this.props.msg}</strong>
//											</div>}
//											{/*this.props.msg && <div className="alert alert-warning alert-dismissible fade show" role="alert">
//												<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//  											<strong>{this.props.msg}</strong>
//											</div>*/}
//			                <div className="form-label-group">
//												<input
//												autoFocus
//												name="username"
//												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
//												className="form-control"
//												placeholder="correo / número de celular"
//												type="text" id="inputEmail"
//												value={this.state.username}
//												required></input>
//			                  <label htmlFor={"inputEmail"}>Ingrese correo o número celular</label>
//			                </div>
//
//			                <div className="form-label-group">
//												<input
//												type="password"
//												name="password"
//												onChange= {this.handleInput} // {(event, newValue) => this.setState({password:newValue})}
//												className="form-control"
//												placeholder="clave"
//												id="inputPassword"
//												value={this.state.password}
//												required>
//												</input>
//			                  <label htmlFor={"inputPassword"}>Ingrese la contraseña</label>
//			                </div>
//
//			                <div className="custom-control custom-checkbox mb-3">
//			                  <input type={"checkbox"} className="custom-control-input" id="customCheck1" checked={this.state.remember} onChange={this.handleRemember}></input>
//			                  <label className="custom-control-label" >Recordar</label>
//											</div>
//											<div>
//											{  }
//											</div>
//			                <button disabled={this.state.isLoading} className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 w-100" type="submit">
//												{this.state.isLoading ? (
//												<>
//												<Ellipsis size={60} color={"#ff4d4d"}/>{ " " }
//												Ingresando ...
//												</>
//												) : ("Ingresar")
//												}
//											</button>
//			                <div className="text-center">
//											{/*<Link to={"/restablecerClave"} className="small">¿Olvidaste tu contraseña?</Link>*/}
//			                  <a className="small" onClick={this.handleOlvidasteClave} href="javascript:void(0)">¿Olvidaste tu contraseña?</a>
//											</div>
//											<br/>
//											<button className="btn btn-lg btn-success btn-block btn-login font-weight-bold mb-2 w-100" onClick={this.handleRegistrarse} type="button">Crear una cuenta</button>
//			              </form>
//			            </div>
//			          </div>
//			        </div>
//			      </div>
//			    </div>
//			  </div>
//			</div>
//			}
//			</>
//		)
//	}
//}
//
//export default LoginForm2; //withCookies(LoginForm);
