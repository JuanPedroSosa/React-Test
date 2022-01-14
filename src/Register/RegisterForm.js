/* eslint-disable no-script-url */
import React, { useState } from 'react';
//import { requestRegister } from '../api/serverQuery';
import "../Login/login.css";
import { useMutateRegister } from '../services/apiServices';
import { connServer } from "../settings";

/**
 * Cuando se registra un cliente lo único que no puede estar repetido es el celular
 */
export const RegisterForm = ({onLogin}) => {

	const [mail, setMail] = useState("");
	const [name, setName] = useState("");
	const [lastname, setLastname] = useState("");
	const [cellPhone, setCellPhone] = useState("");
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const {mutate, isLoading, reset} = useMutateRegister();

	const handleOnValid = (id, b) => {
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

	const handleInput = (e) => {
		console.log("event: " + e.target.name, e.target.value);
		const {name, value} = e.target;

		if (name === "nombre") {
			if (value.trim().length >= 1)
				handleOnValid("inputFirstname", true);
			else
				handleOnValid("inputFirstname", false);

			setName(value)
		}
		else if (name === "apellido") {
			if (value.trim().length >= 1)
				handleOnValid("inputLastname", true);
			else
				handleOnValid("inputLastname", false);

			setLastname(value)
		}
		else if (name === "correo") {
			const emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
			if (emailValid)
				handleOnValid("inputEmail", true);
			else
				handleOnValid("inputEmail", false);

			setMail(value)
		}
		else if (name === "clave") {
			if (value.trim().length >= 4)
				handleOnValid("inputPassword", true);
			else
				handleOnValid("inputPassword", false);

			setPassword(value);
		}
	}

	const handleInputCel = (e) => {
		let code = (e.target.validity.valid) ? e.target.value : cellPhone;
		const {name, value} = e.target;
		console.log("event: " + e.target.name, " - ", e.target.value, " : ", code);

		if (value === "")
			code = "";

		if (value.length >= 6 && value.length <= 12) {
			handleOnValid("inputCel", true);
		}
		else {
			handleOnValid("inputCel", false);
		}

		setCellPhone(value)
	}

	const handleSubmit = async (e) => {
		// evita que se refresque la pantalla
		e.preventDefault();
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
						//alert("error");
					}
					//console.log("add class");
					//form.classList.add('was-validated');
				//}, false)
			})

		if (validated) {
			console.log("nombre: " + name +	"apellido: " + lastname)
			const regData = {
				nombre: name,
				apellido: lastname,
				correo: mail,
				celular: cellPhone,
				clave: password
			};
			// mutate: por tratarse de una llamada a fetch
			// no hace falta colocarlo en un try catch, viene en onError cualquier error fetch
			mutate(regData, {
				onSuccess: (data) => {
					if (data !== undefined && data.status === "ok") {
						console.log("cliente ingresado:", data);
						setMsg("Cliente registrado correctamente !!!")
					}
					else {
						setMsg(data.message)
					};
				},
				onError: (err) => {
					// error de fetch devuelve un object y lo paso el string para mostrarlo en un alert
					let error = err.toString();
					if (error.toLowerCase().search("networkerror") !== -1)
						error = "Sin conexión";

					setMsg(error)
				},
				retry: connServer.retry
			});
		}
		else {
			setMsg("Datos incompletos")
			console.log("error en la validación de datos");
		}
	}

	console.log("msg:", msg)
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
		              <h3 className="login-heading mb-4"><strong>APP MIDEX</strong></h3>
									<hr/>
									<h6 className="login-heading2 mb-2"><b>Registrarte</b></h6>
									{msg && <div className="alert alert-warning mb-2">{msg}</div>}
		              <form onSubmit={handleSubmit} noValidate  className="needs-validation"> {/*className="was-validated" */}
									<div className="form-label-group">
											<input
											name="nombre"
											onChange= {handleInput} // {(event, newValue) => this.setState({username:newValue})}
											className="form-control is-invalid"
											placeholder="correo / número de celular"
											type="text"
											id="inputFirstname"
											required></input>
											<div className="invalid-feedback">
      								no puede estar vacío
    									</div>
		                  <label for={"inputFirstname"}>Ingrese su nombre</label>
		                </div>
										<div className="form-label-group">
											<input
											name="apellido"
											onChange= {handleInput} // {(event, newValue) => this.setState({username:newValue})}
											className="form-control is-invalid"
											placeholder="correo / número de celular"
											type="text" id="inputLastname"
											required></input>
											<div className="invalid-feedback">
      								no puede estar vacío
    									</div>
		                  <label for={"inputLastname"}>Ingrese su apellido</label>
		                </div>
		                <div className="form-label-group">
											<input
											name="correo"
											onChange= {handleInput} // {(event, newValue) => this.setState({username:newValue})}
											className="form-control is-invalid"
											placeholder="correo / número de celular"
											type="email" id="inputEmail"
											required></input>
											<div className="invalid-feedback">
      								formato nombreusuario@dominio.com
    									</div>
		                  <label for={"inputEmail"}>Ingrese su correo</label>
		                </div>
										<div className="form-label-group">
											<input
											name="celular"
											onInput={handleInputCel}
											pattern="[0-9]*"
											value={cellPhone}
											//onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
											className="form-control is-invalid"
											placeholder="número de celular 1120211973"
											type="text"
											id="inputCel"
											required></input>
											<div className="invalid-feedback">
      								Cód de área sin el 0 + nro de celular sin el 15
    									</div>
		                  <label for={"inputCel"}>Número celular Ej 1120211973</label>
		                </div>
										<div className="form-label-group">
											<input
											name="clave"
											onChange= {handleInput} // {(event, newValue) => this.setState({username:newValue})}
											className="form-control is-invalid"
											placeholder="contraseña"
											type="password"
											id="inputPassword"
											required></input>
											<div className="invalid-feedback">
      								debe tener al menos 4 caracteres
    									</div>
		                  <label for={"inputPassword"}>Ingrese su contraseña</label>
		                </div>
		                <button disabled={isLoading} className="btn btn-lg btn-success btn-block btn-login font-weight-bold mb-2 w-100" type="submit">
										{isLoading ? (
											<>
											 <span className="spinner-border spinner-border-sm"></span>{" "}
											 Procesando ...
											{/*text-uppercase<Ellipsis size={25} color={"#ff4d4d"}/>*/}
											</>
											) : ("Crear cuenta")
											}
										</button>
										<div className="text-center">
										  <p>¿Ya tienes una cuenta? <a style={{"margin-left": "5px"}} onClick={() => {onLogin()}} href="javascript:void(0)">Iniciar sesión</a></p>
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
	);
}