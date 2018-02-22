const base = 'https://api.codus.arkis.io/';

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
export function put(endpoint, body, contentType = 'text/plain') {
  const headers = { 'Content-Type': contentType };
  return apiRequest(endpoint, 'PUT', headers, body);
}
