/* eslint-disable no-script-url */
import React, { Component } from 'react';
import "../Login/login.css";
import { connServer } from "../settings";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPIClientes = `${url}/api/clientes`;
/**
 * Cuando se registra un cliente lo único que no puede estar repetido es el celular
 */
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
		this.handleOnValid = this.handleOnValid.bind(this);
	}

	handleOnValid = (id, b) => {
		const inp = document.getElementById(id);

		if (inp === null)
			return;

		if (b) {
			inp.classList.add("is-valid");
			inp.classList.remove("is-invalid");
		}
		else {
			inp.classList.add("is-invalid");
			inp.classList.remove("is-valid");
		}
	}

	handleInput (e) {
		console.log("event: " + e.target.name, e.target.value);
		const {name, value} = e.target;

		if (name === "nombre") {
			if (value.trim().length >= 1)
				this.handleOnValid("inputFirstname", true);
			else
				this.handleOnValid("inputFirstname", false);
		}
		else if (name === "apellido") {
			if (value.trim().length >= 1)
				this.handleOnValid("inputLastname", true);
			else
				this.handleOnValid("inputLastname", false);
		}
		else if (name === "correo") {
			const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			if (emailValid)
				this.handleOnValid("inputEmail", true);
			else
				this.handleOnValid("inputEmail", false);
		}
		else if (name === "clave") {
			if (value.trim().length >= 4)
				this.handleOnValid("inputPassword", true);
			else
				this.handleOnValid("inputPassword", false);
		}

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

		if (value.length >= 6 && value.length <= 12) {
			this.handleOnValid("inputCel", true);
		}
		else {
			this.handleOnValid("inputCel", false);
		}

		this.setState({
			[name] : code
		});
	}

	async handleSubmit(e) {
		// evita que se refresque la pantalla
		e.preventDefault();

		//this.setState({username:'hola'})
		//console.log(`reset password submit: ${this.state.correo}, ${this.state.nombre}, ${this.state.apellido}, ${this.state.celular}`);
		let validated = true;
		// Fetch all the forms we want to apply custom Bootstrap validation styles to
		const forms = document.querySelectorAll('.needs-validation')
		// console.log("forms:", forms);
		// Loop over them and prevent submission
		Array.prototype.slice.call(forms)
			.forEach(function (form) {
				console.log("sub form:", form);
				//form.addEventListener('submit', function (event) {
					if (!form.checkValidity()) {
						e.preventDefault()
						e.stopPropagation()
						validated = false;
						console.log("check valid");
						alert("error");
					}
					//console.log("add class");
					//form.classList.add('was-validated');
				//}, false)
			})


		if (validated) {
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
		}
		else
			console.log("error en la validación de datos");
	}


	render() {

		/*const forms = document.querySelectorAll('.needs-validation1')
		console.log("forms:", forms);
		// Loop over them and prevent submission
		Array.prototype.slice.call(forms)
			.forEach(function (form) {
				console.log("sub form:", form);
				form.addEventListener('submit', function (event) {
					if (!form.checkValidity()) {
						event.preventDefault()
						event.stopPropagation()
						console.log("check valid")
					}
					console.log("add class");
					form.classList.add('was-validated');
				}, false)
			})*/

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
			              <form onSubmit={this.handleSubmit} noValidate  className="needs-validation"> {/*className="was-validated" */}
										<div className="form-label-group">
												<input
												name="nombre"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control is-invalid"
												placeholder="correo / número de celular"
												type="text"
												id="inputFirstname"
												required></input>
												<div class="invalid-feedback">
        								no puede estar vacío
      									</div>
			                  <label for={"inputFirstname"}>Ingrese su nombre</label>
			                </div>
											<div className="form-label-group">
												<input
												name="apellido"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control is-invalid"
												placeholder="correo / número de celular"
												type="text" id="inputLastname"
												required></input>
												<div class="invalid-feedback">
        								no puede estar vacío
      									</div>
			                  <label for={"inputLastname"}>Ingrese su apellido</label>
			                </div>
			                <div className="form-label-group">
												<input
												name="correo"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control is-invalid"
												placeholder="correo / número de celular"
												type="email" id="inputEmail"
												required></input>
												<div class="invalid-feedback">
        								formato nombreusuario@dominio.com
      									</div>
			                  <label for={"inputEmail"}>Ingrese su correo</label>
			                </div>
											<div className="form-label-group">
												<input
												name="celular"
												onInput={this.handleInputCel.bind(this)}
												pattern="[0-9]*"
												value={this.state.celular}
												//onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control is-invalid"
												placeholder="número de celular 1120211973"
												type="text"
												id="inputCel"
												required></input>
												<div class="invalid-feedback">
        								Cód de área sin el 0 + nro de celular sin el 15
      									</div>
			                  <label for={"inputCel"}>Número celular Ej 1120211973</label>
			                </div>
											<div className="form-label-group">
												<input
												name="clave"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control is-invalid"
												placeholder="contraseña"
												type="password"
												id="inputPassword"
												required></input>
												<div class="invalid-feedback">
        								debe tener al menos 4 caracteres
      									</div>
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