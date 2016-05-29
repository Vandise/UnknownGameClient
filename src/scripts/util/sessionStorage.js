export function logout() {
  global.document.cookie = 'login=false';
  window.sessionStorage.clear();
};

export function login(user) {
  global.document.cookie = 'login=true';
  window.sessionStorage.setItem('user', JSON.stringify(user));
};

export function currentUser() {
  return JSON.parse(window.sessionStorage.getItem('user'));
};

export function isLoggedIn() {
  return global.document.cookie.indexOf('login=true') !== -1;
};

export function setCurrentServer(server) {
  window.sessionStorage.setItem('server', JSON.stringify(server));
};

export function getCurrentServer() {
  return JSON.parse(window.sessionStorage.getItem('server'));
}