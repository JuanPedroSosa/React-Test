import React, { Component } from "react";
// import { useHistory } from "react-router-dom";
import QrReader from "modern-react-qr-reader";
//import { Acciones } from "../Acciones/Acciones";
import { HeaderSecondary } from "../components/HeaderSecondary";
import { Navbar } from "../components/Navbar";
import { QueryStringContext } from "../queryStringContext";
import { connServer } from "../settings";
import CryptoJS from "crypto-js";
import { Redirect } from "react-router-dom";
// import "./qr.css";
const MESSAGE_DEFAULT = "no hay resultados";
const MESSAGE_QR = "Escaneá código QR";

class QrContainer extends Component {
	static contextType = QueryStringContext;
	constructor(props) {
		super(props);
		this.state = {
			result: MESSAGE_DEFAULT
		}
		this.handleScan = this.handleScan.bind(this);
		//this.handleGoBack = this.handleGoBack.bind(this);
		//const {history} = this.props;
	}

	componentDidMount() {
    this.setState({result: MESSAGE_DEFAULT
		});
	}

	handleScan(result) {
		if (result != null) {
			//this.setState((state) => ({
			//	result: result.text
			//}));
			console.log("handleScan: ",  result);
			this.setState({result: result});
			// recibimos la qs encriptada
			const query = result.split("?");

			if (query.lenght < 2) {
				console.log("Se esperan al menos 2");
				this.context.setQueryStringQR("");
			}
			else {
				try {
					console.log("ReaderQR query: " + query[1]);
					const qsDecode = CryptoJS.AES.decrypt(query[1], connServer.queryKey);
					const originalText = qsDecode.toString(CryptoJS.enc.Utf8);
					this.context.setQueryStringQR(originalText);
				}
				catch (err) {
					console.log("ReaderQR err" + err);
					this.context.setQueryStringQR("");
				}
			}
		}
		//this.setState((result != null) ? result.text : "");
	}

	handleError(error) {
		console.log(error);
	}

	handleGoBack() {
		//this.history.goBack();
	}

	render() {
		/*const previweStyle = {
			width: 320,
			height: 440,
			display: "flex",
			"justify-content": "center"
		}*/

		/*const camStyle = {
			display: "flex",
			"justify-content": "center",
			marginTop: "-50px",
			borderRadius: 100,
		}*/

		const textStyle = {
			fontSize: "30px",
			"text-align": "center",
			marginTop: "-50px"
		}
		// <div style={boxQR}>
		// style={previweStyle}
		// className="qr-image-wrapper"
		// div -> style={camStyle}
		// qrread -> style={previweStyle}
		console.log("estoy en QR " + this.state.result)
	return (
		<React.Fragment>
			{this.state.result === MESSAGE_DEFAULT &&
				<div>
					<Navbar/>
					<HeaderSecondary/>
					{/*<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_QR}</h1></div>*/}
					<div className="row">
						<strong>{MESSAGE_QR}</strong>
					</div>
					<QrReader
					delay={100}
					facingMode={"environment"}
					style={{width: "100%"}}
					onError={this.handleError}
					onScan={this.handleScan}
					/>
					<p style={textStyle}>
					{this.state.result}
					</p>
				</div>
			}
			{ this.state.result !== MESSAGE_DEFAULT && <Redirect push to="/acciones"/>}
			{/*<Acciones qr={this.state.result} />*/}
			{/* this.state.result !== MESSAGE_DEFAULT && <Acciones qr={this.state.result}/>*/}
		</React.Fragment>)
	}
}

export default QrContainer;