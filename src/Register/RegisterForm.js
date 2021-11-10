import React, {Component} from 'react';
import "../Login/login.css";
import APIServerContext, {connServer} from "../settings";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPIClientes = `${url}/api/clientes`;

class RegisterForm extends Component {
	constructor() {
		super();
		this.state = {
			correo: '',
			celular: '',
			nombre: '',
			apellido: '',
			clave: '',
			msg: ''
		}
		// React pierde el scope this, entonces con bind le decimos a la
		// clase que pertenece
		this.handleInput = this.handleInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleInput (e) {
		console.log("event: " + e.target.name, e.target.value);
		const {name, value} = e.target;
		this.setState({
			[name] : value
		})
	}

	handleInputCel (e) {
		let code = (e.target.validity.valid) ? e.target.value : this.state.celular;
		const {name, value} = e.target;
		console.log("event: " + e.target.name, " - ", e.target.value, " : ", code);

		if (value === "")
			code = "";

		this.setState({
			[name] : code
		})
	}
	async handleSubmit(e) {
		// evita que se refresque la pantalla
		e.preventDefault();
		//this.setState({username:'hola'})
		console.log(`reset password submit: ${this.state.correo}, ${this.state.nombre}, ${this.state.apellido}, ${this.state.celular}`);

		fetch(urlAPIClientes, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				nombre: this.state.nombre,
				apellido: this.state.apellido,
				correo: this.state.correo,
				celular: this.state.celular,
				clave:this.state.clave
				}), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
			console.log('Response ciente Success:', response);
			if (response !== undefined && response.status === "ok") {
				console.log("cliente ingresado:", response);
				this.setState({msg: "Cliente registrado correctamente !!!"});
			}
			else {
				this.setState({msg: `${response.message}`});
			};
		});
		console.log("fin reset registro");
	}

	render() {

		return (
			<>
			<div className="container-fluid">
			  <div className="row no-gutter">
			    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
			    <div className="col-md-8 col-lg-6">
			      <div className="login d-flex align-items-center py-1">
			        <div className="container">
			          <div className="row">
			            <div className="col-md-9 col-lg-8 mx-auto">
			              <h3 className="login-heading mb-4">APP-MIDEX</h3>
										<hr/>
										<h6 className="login-heading2 mb-2"><b>Registrarte</b></h6>
										{this.state.msg !== "" && <div className="alert alert-warning mb-2">{this.state.msg}</div>}
			              <form onSubmit={this.handleSubmit}>
										<div className="form-label-group">
												<input
												name="nombre"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="correo / número de celular"
												type="text" id="inputFirstname"
												required></input>
			                  <label for={"inputFirstname"}>Ingrese su nombre</label>
			                </div>
											<div className="form-label-group">
												<input
												name="apellido"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="correo / número de celular"
												type="text" id="inputLastname"
												required></input>
			                  <label for={"inputLastname"}>Ingrese su apellido</label>
			                </div>
			                <div className="form-label-group">
												<input
												name="correo"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="correo / número de celular"
												type="text" id="inputEmail"
												required></input>
			                  <label for={"inputEmail"}>Ingrese su correo</label>
			                </div>
											<div className="form-label-group">
												<input
												name="celular"
												onInput={this.handleInputCel.bind(this)}
												pattern="[0-9]*"
												value={this.state.celular}
												//onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="número de celular"
												type="text" id="inputCel"
												required></input>
			                  <label for={"inputCel"}>Ingrese su número celular</label>
			                </div>
											<div className="form-label-group">
												<input
												name="clave"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="contraseña"
												type="password" id="inputPassword"
												required></input>
			                  <label for={"inputPassword"}>Ingrese su contraseña</label>
			                </div>
			                <button className="btn btn-lg btn-success btn-block btn-login text-uppercase font-weight-bold mb-2 w-100" type="submit">Crear cuenta</button>
											<div className="text-center">
											  <p>¿Ya tienes una cuenta? <a style={{"margin-left": "5px"}} onClick={() => {this.props.onLogin()}} href="javascript:void(0)">Iniciar sesión</a></p>
											</div>
			              </form>
			            </div>
			          </div>
			        </div>
			      </div>
			    </div>
			  </div>
			</div>
			</>
		)
	}
}


export default RegisterForm;