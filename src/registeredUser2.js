import React, { useContext } from 'react';
/**
 * Context: se almacena los datos del cliente que inicia la sesión
 * nombre, correo, jwt, etc
 */
export const ContextUser = React.createContext({ data: {}, setData: () => {} });

export const useWebsocket = () => useContext(ContextUser);

