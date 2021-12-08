import { createContext } from 'react';

const ContextoUsuario = createContext();

export const ProviderUsuario = ContextoUsuario.Provider;
export const ConsumerUsuario = ContextoUsuario.Consumer;

export default ContextoUsuario;

