import { createContext } from 'react';

const ContextoQueryStringQR = createContext();

export const ProviderQueryStringQR = ContextoQueryStringQR.Provider;
export const ConsumerQueryStringQR = ContextoQueryStringQR.Consumer;

export default ContextoQueryStringQR;

