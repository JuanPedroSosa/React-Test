import React, {Component} from 'react';
import { Link } from "react-router-dom";
import "./login.css";
import ResetPasswordForm from "../ResetPassword/ResetPasswordForm";
import RegisterForm from "../Register/RegisterForm";

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
			forgot: false,
			register: false,
		}
		// React pierde el scope this, entonces con bind le decimos a la
		// clase que pertenece
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleOlvidasteClave = this.handleOlvidasteClave.bind(this);
		this.handleRegistrarse = this.handleRegistrarse.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
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

	async handleSubmit(e) {
		// evita que se refresque la pantalla
		e.preventDefault();
		//this.setState({username:'hola'})
		console.log(`login submit: ${this.state.username}`);
		this.props.onAddUsers(this.state);
		// const token = await loginUser({
    //   username: this.state.username,
    //   password: this.state.password
		// });
		// console.log(`login token: ${JSON.stringify(token)}`);
		// this.props.setToken(token.token);
		console.log("fin login");
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
			                <div className="form-label-group">
												<input
												name="username"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="correo / número de celular"
												type="text" id="inputEmail"
												required></input>
			                  <label for={"inputEmail"}>Ingrese correo o número celular</label>
			                </div>

			                <div className="form-label-group">
												<input
												type="password"
												name="password"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({password:newValue})}
												className="form-control"
												placeholder="clave"
												id="inputPassword"
												required>
												</input>
			                  <label for={"inputPassword"}>Ingrese la contraseña</label>
			                </div>

			                {/*<div className="custom-control custom-checkbox mb-3">
			                  <input type={"checkbox"} className="custom-control-input" id="customCheck1"></input>
			                  <label className="custom-control-label" >Remember password</label>
											</div>*/}
			                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 w-100" type="submit">Ingresar</button>
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
export default LoginForm;