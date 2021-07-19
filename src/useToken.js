import { useState } from 'react';

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem('token');
		const userToken = JSON.parse(tokenString);
		console.log(`token leido: ${userToken}`);
		// console.log(`token 2 leido: ${userToken?.token}`);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  return {
    setToken: saveToken,
  	token: getToken()
  }
}