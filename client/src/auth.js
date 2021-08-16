import jwtDecode from 'jwt-decode';

const accessTokenKey = 'accessToken';
const loginUrl = 'http://localhost:9000/login';

function getUserFromToken(token) {
  return jwtDecode(token).sub;
}

export const getAccessToken = () => {
  return localStorage.getItem(accessTokenKey);
}

export const getLoggedInUser = () => {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

export const login = async (name, password) => {
  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ name, password })
  });
  if (!response.ok) {
    return null;
  }
  const { token } = await response.json();
  localStorage.setItem(accessTokenKey, token);
  return getUserFromToken(token);
}

export const logout = () => {
  localStorage.removeItem(accessTokenKey);
}
