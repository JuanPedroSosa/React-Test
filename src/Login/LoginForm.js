import React, {Component} from 'react';
import "./login.css";

class LoginForm extends Component {
	constructor() {
		super();
		this.state = {
			username: '',
			password: '',
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
		console.log(`login submit: ${this.state.username}`);
		this.props.onAddUsers(this.state);
		const token = await loginUser({
      username: this.state.username,
      password: this.state.password
		});
		console.log(`login token: ${JSON.stringify(token)}`);
		this.props.setToken(token.token);
		console.log("fin login");
	}

	render() {
		return (
<div className="container-fluid">
  <div className="row no-gutter">
    <div className="d-none d-md-flex col-md-4 col-lg-6 bg-image"></div>
    <div className="col-md-8 col-lg-6">
      <div className="login d-flex align-items-center py-5">
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-lg-8 mx-auto">
              <h3 className="login-heading mb-4">APP-MIDEX</h3>
							<h4 className="login-heading mb-4">Bienvenido a la APP-MIDEX</h4>
              <form onSubmit={this.handleSubmit}>
                <div className="form-label-group">
									<input
									name="username"
									onChange= {this.handleInput} // {(event, newValue) => this.setState({username:newValue})}
									className="form-control"
									placeholder="correo / número de celular"
									type="email" id="inputEmail"
									required></input>
                  <label for={"inputEmail"}>Ingrese correo / nro celular</label>
                </div>

                <div className="form-label-group">
									<input
									type="password"
									name="password"
									onChange= {this.handleInput} // {(event, newValue) => this.setState({password:newValue})}
									className="form-control"
									placeholder="clave"
									id="inputPassword"
									required></input>
                  <label for={"inputPassword"}>Ingrese la clave</label>
                </div>

                <div className="custom-control custom-checkbox mb-3">
                  <input type={"checkbox"} className="custom-control-input" id="customCheck1"></input>
                  <label className="custom-control-label" >Remember password</label>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-login text-uppercase font-weight-bold mb-2" type="submit">Ingresar</button>
                <div className="text-center">
                  <a className="small">Forgot password?</a></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




		)
	}
}

async function loginUser(credentials) {
	return fetch('http://localhost:8080/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(credentials)
	}).then(data => data.json())
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