import React, {createContext} from "react";
import config from "./config/config.json";
const env = process.env.NODE_ENV || 'development';
export const connServer = config[env];
console.log("datos con:", connServer, " env:", env);
const APIServerContext = React.createContext(connServer);

export default APIServerContext;