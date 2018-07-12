export const LOGIN = 'login';
export const REGISTER = 'register';
export const GET_USER_SESSION = 'GET_USER_SESSION';
export const LOGOUT = 'LOGOUT';

export function login(values) {
  return {
    type: LOGIN,
    values
  };
}

export function register(values) {
  return {
    type: REGISTER,
    values
  };
}

export function getUserSession(){
  return { type: GET_USER_SESSION };
}

export function logout() {
  return { type: LOGOUT };
}
