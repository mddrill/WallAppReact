export function startNewUserSession(token, username) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    return getCurrentUserSession();
}

export function getCurrentUserSession() {
  return { username: localStorage.getItem('username'), token: localStorage.getItem('token') };
}

export function closeUserSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("username")
}

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
