import React, { useContext } from 'react';

export const ContextUser = React.createContext({ data: {}, setData: () => {} });

export const useWebsocket = () => useContext(ContextUser);

