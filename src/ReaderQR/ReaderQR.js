import React, { Component } from "react";
import QrReader from "react-qr-scanner";
import "./qr.css";

class QrContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			result: "ok"
		}
		this.handleScan = this.handleScan.bind(this);
	}

	handleScan(result) {
		console.log(result);
		if (result != null)
			this.setState({result: result.text});
		//this.setState((result != null) ? result.text : "");


		//this.setState({
		//	result:  (!result) ? result.text: ""
		//})
	}

	handleError(error) {
		console.log(error);
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
	return (
		<React.Fragment>
			<div style={camStyle}>
				<QrReader
				delay={100}
				style={previweStyle}
				onError={this.handleError}
				onScan={this.handleScan}
				showViewFinder={false}

				/>
			</div>
			<p style={textStyle}>
				{this.state.result}
			</p>
		</React.Fragment>
	)
	}
}

export default QrContainer;