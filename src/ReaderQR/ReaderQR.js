import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import QrReader from "modern-react-qr-reader";
import { Acciones } from "../Acciones/Acciones";
import { NavbarSecondary } from "../components/NavbarSecondary";
// import "./qr.css";
const MESSAGE_DEFAULT = "no hay resultados";
const MESSAGE_QR = "Escaneá código QR";

class QrContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: MESSAGE_DEFAULT
		}
		this.handleScan = this.handleScan.bind(this);
		//this.handleGoBack = this.handleGoBack.bind(this);
		//const {history} = this.props;
	}

	handleScan(result) {
		if (result != null) {
			//this.setState((state) => ({
			//	result: result.text
			//}));
			console.log("handleScan: ",  result);
			this.setState({result: result});
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
		const previweStyle = {
			width: 320,
			height: 440,
			display: "flex",
			"justify-content": "center"
		}

		const camStyle = {
			display: "flex",
			"justify-content": "center",
			marginTop: "-50px",
			borderRadius: 100,
		}

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
	return (
		<React.Fragment>
			{this.state.result == MESSAGE_DEFAULT &&
				<div>
					<NavbarSecondary/>
					<div class="alert alert-danger font-weight-bold my-0" role="alert"><h1>{MESSAGE_QR}</h1></div>
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
			{ this.state.result !== MESSAGE_DEFAULT && <Acciones qr={this.state.result}/>}
		</React.Fragment>)
	}
}

export default QrContainer;