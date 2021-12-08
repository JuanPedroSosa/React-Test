import React from "react";
import { Link } from "react-router-dom";
import "./card.css";
// <img src={props.imageSource} alt="a wallpaper" className="card-img-top" />
// <img src={props.imageSource} alt={props.title} className="img-fluid mr-4 rounded-circle" width="70" />
// <img src={props.imageSource} alt={props.title} className="card-img-bottom m-auto rounded-circle img-fluid " width="70" />
export const Card = props => (
	<div className="card text-center bg-light animate__animated animate__fadeInUp">
	<div className="card-body text-light">
		<h4 className="card-title text-primary">{props.title}</h4>
		<p className="card-text text-secondary">
			{props.text
				? props.text
				: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam deserunt fuga accusantium excepturi quia, voluptates obcaecati nam in voluptas perferendis velit harum dignissimos quasi ex? Tempore repellat quo doloribus magnam."}
		</p>
		<div className="overflow">
		<img src={props.imageSource} alt={props.title} className="img-fluid mr-4 rounded-circle" style={{width:90}} />
		</div>
		<div className="row m-0">
		<Link to={"/acciones"} className="btn btn-primary ext-white p-3 my-2">
		COMPRAR
		</Link>
		</div>
		<div className="row m-0">
		<Link to={props.url ? props.url : "#!"} className="btn btn-danger text-white p-3 ">
		Cancelar
		</Link>
		</div>
	</div>
	</div>
);