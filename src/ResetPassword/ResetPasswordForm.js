import React, {Component} from 'react';
import "../Login/login.css";
import APIServerContext, {connServer} from "../settings";
const modo = process.env.NODE_ENV || 'development';
const url =  modo === 'development' ? `${connServer.urlAPI}:${connServer.port}` : `${connServer.urlAPI}`;
const urlAPIRestablecerClave = `${url}/api/restablecerClave/`;

class ResetPasswordForm extends Component {
	constructor() {
		super();
		this.state = {
			email: '',
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

	async handleSubmit(e) {
		// evita que se refresque la pantalla
		e.preventDefault();
		//this.setState({username:'hola'})
		console.log(`reset password submit: ${this.state.emai}`);

		fetch(urlAPIRestablecerClave, {
			method: 'POST', // or 'PUT'
			body: JSON.stringify({
				correo: this.state.email,
				}), // data can be `string` or {object}!
			headers:{
				'Content-Type': 'application/json'
			}
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => {
			console.log('Response reset password Success:', response);
			if (response !== undefined && response.status === "ok") {
				console.log("restablecer clave:", response);
				this.setState({msg: "Se ha enviado el correo electrónico correctamente !!!"});
			}
			else {
				this.setState({msg: `${response.message}`});
			};
		});
		console.log("fin reset password");
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
										<h4 className="login-heading2 mb-4">Restablecer contraseña</h4>
										<h6>Ingrese su dirección de correo electrónico y le enviaremos un enlace para restablecer su contraseña. En el caso de no recibir el correo, por favor, revise su correo basura o spam</h6>
										{this.state.msg !== "" && <div className="alert alert-warning mb-2">{this.state.msg}</div>}
			              <form onSubmit={this.handleSubmit}>
			                <div className="form-label-group">
												<input
												name="email"
												onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
												className="form-control"
												placeholder="correo / número de celular"
												type="text" id="inputEmail"
												required></input>
			                  <label for={"inputEmail"}>Ingrese el correo</label>
			                </div>
			                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2 w-100" type="submit">Enviar</button>
											<button className="btn btn-lg btn-secondary btn-block btn-login font-weight-bold mb-2 w-100" onClick={() => {this.props.onLogin()}} type="button">Cancelar</button>
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


export default ResetPasswordForm;