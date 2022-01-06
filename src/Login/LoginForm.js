import React, {Component} from 'react';
// import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import "./login.css";
import ResetPasswordForm from "../ResetPassword/ResetPasswordForm";
import RegisterForm from "../Register/RegisterForm";
import { connServer } from "../settings";
import { QueryStringContext } from "../queryStringContext";
//import { instanceOf } from 'prop-types';
//import { withCookies, Cookies } from "react-cookie";
import { Ellipsis } from "react-awesome-spinners";

class LoginForm extends Component {
	static contextType = QueryStringContext;
	/*static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };*/
	constructor(props) {
		super(props);
		const { cookies } = props;
		console.log("login cookies: ", cookies);
		this.state = {
			username: cookies.username || "", // cookies.get("username")
			password: cookies.password || "", // cookies.get("password")
			forgot: false,
			register: false,
			remember: false,
			isLoading: false
		}
		// React pierde el scope this, entonces con bind le decimos a la
		// clase que pertenece
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOlvidasteClave = this.handleOlvidasteClave.bind(this);
		this.handleRegistrarse = this.handleRegistrarse.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
		this.handleRemember = this.handleRemember.bind(this);
		this.msg = this.props.msg;
	}

	componentDidMount() {
		const query = window.location.search.substring(1);
		if (query !== undefined) {
			console.log(query);
			const qsDecode = CryptoJS.AES.decrypt(query, connServer.queryKey);
			const originalText = qsDecode.toString(CryptoJS.enc.Utf8);
			this.context.setQueryStringQR(originalText);
		}
		else this.context.setQueryStringQR("");
		console.log("Login qs: ", this.context.queryStringQR);
	}

	componentDidUpdate() {
	}

	handleInput (e) {
		console.log("event: " + e.target.name, e.target.value);
		const {name, value} = e.target;
		this.setState({
			[name] : value
		})
	}

	handleOlvidasteClave () {
		this.setState({forgot: true, register: false})
	}

	handleRegistrarse () {
		console.log("estoy en registarte");
		this.setState({register: true, forgot: false})
	}

	handleLogin () {
		console.log("estoy en login");
		this.setState({register: false, forgot: false})
	}

	handleRemember(e) {
		const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;
    this.setState({
			"remember": value
		});
	}

	async handleSubmit(e) {
		this.setState({isLoading: true});
		// evita que se refresque la pantalla
		e.preventDefault();


		//this.setState({username:'hola'})
		console.log(`login submit: ${this.state.username}`);
		this.props.onAddUsers(this.state);
		this.setState({isLoading: false});
		// const token = await loginUser({
    //   username: this.state.username,
    //   password: this.state.password
		// });
		// console.log(`login token: ${JSON.stringify(token)}`);
		// this.props.setToken(token.token);
		console.log("fin login");
		//this.props.history.push("/app-midex");
	}

	render() {

		return (
			<>
			{this.state.register && <RegisterForm onLogin={this.handleLogin} />}
			{this.state.forgot === true && !this.state.register && <ResetPasswordForm onLogin={this.handleLogin}/>}
			{this.state.forgot === false && !this.state.register && <div className="container-fluid">
			  <div className="row no-gutter">
			    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
			    <div className="col-md-8 col-lg-6">
			      <div className="login d-flex align-items-center py-1">
			        <div className="container">
			          <div className="row">
			            <div className="col-md-9 col-lg-8 mx-auto">
			              <h3 className="login-heading mb-4">APP-MIDEX</h3>
										<hr/>
										<h6 className="login-heading2 mb-4">Bienvenido a la APP-MIDEX</h6>
			              <form onSubmit={this.handleSubmit}>
											{this.props.msg && <alert className="alert alert-warning mb-1">{this.props.msg}</alert>}
			                <div className="form-label-group">
												<input
												autoFocus
												name="username"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="correo / número de celular"
												type="text" id="inputEmail"
												value={this.state.username}
												required></input>
			                  <label htmlFor={"inputEmail"}>Ingrese correo o número celular</label>
			                </div>

			                <div className="form-label-group">
												<input
												type="password"
												name="password"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({password:newValue})}
												className="form-control"
												placeholder="clave"
												id="inputPassword"
												value={this.state.password}
												required>
												</input>
			                  <label htmlFor={"inputPassword"}>Ingrese la contraseña</label>
			                </div>

			                <div className="custom-control custom-checkbox mb-3">
			                  <input type={"checkbox"} className="custom-control-input" id="customCheck1" checked={this.state.remember} onChange={this.handleRemember}></input>
			                  <label className="custom-control-label" >Recordar</label>
											</div>
											<div>
											{ this.state.isLoading && <Ellipsis size={60} color={"#ff4d4d"}/> }
											</div>
			                { !this.state.isLoading && <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 w-100" type="submit">Ingresar</button>}
			                <div className="text-center">
											{/*<Link to={"/restablecerClave"} className="small">¿Olvidaste tu contraseña?</Link>*/}
			                  <a className="small" onClick={this.handleOlvidasteClave} href="javascript:void(0)">¿Olvidaste tu contraseña?</a>
											</div>
											<br/>
											<button className="btn btn-lg btn-success btn-block btn-login font-weight-bold mb-2 w-100" onClick={this.handleRegistrarse} type="button">Crear una cuenta</button>
			              </form>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>}
			</>
		)
	}
}

/*
<div className="card">
				<form className="card-body" onSubmit={this.handleSubmit}>
					<div className="form-group">
						<input
						type="text"
						name="username"
						onChange= {this.handleInput}//{(event, newValue) => this.setState({username:newValue})}
						className="form-control"
						placeholder="correo / número de celular">
						</input>
					</div>
					<div className="form-group">
						<input
						type="password"
						name="password"
						onChange= {this.handleInput}//{(event, newValue) => this.setState({password:newValue})}
						className="form-control"
						placeholder="clave">
						</input>
					</div>
					<button	type="submit" className="btn btn-block btn-primary">
						Ingresar
					</button>
				</form>
			</div>

*/
export default LoginForm; //withCookies(LoginForm);