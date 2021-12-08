import { createContext } from 'react';

export const QueryStringContext = createContext({
  queryStringQR: "",
  setQueryStringQR: () => {},
});