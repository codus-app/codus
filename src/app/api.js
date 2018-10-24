const base = !Number.isNaN(parseInt(window.location.hostname, 10)) || window.location.hostname === 'localhost'
  ? `http://${window.location.hostname}:3000/api`
  : 'https://api.codus.arkis.io/api';

/** Most generic function */
function apiRequest(endpoint, method, heads, body) {
  const headers = { Authorization: `Bearer ${localStorage.access_token}` };
  Object.assign(headers, heads);

  const url = [
    base.replace(/\/$/g, ''), // Strip trailing slash
    endpoint.replace(/^\//g, ''), // Strip leading slash
  ].join('/');

  return fetch(url, {
    headers, method, body,
  }).then(r => r.json());
}

/** Perform a GET request and return a promise */
export function get(endpoint) {
  return apiRequest(endpoint, 'GET');
}

/** Perform a PUT request with the given body */
export function put(endpoint, body, contentType = 'application/json') {
  const headers = { 'Content-Type': contentType };
  const json = contentType === 'application/json';
  return apiRequest(endpoint, 'PUT', headers, json ? JSON.stringify(body) : body);
}
