const base = !Number.isNaN(parseInt(window.location.hostname, 10)) || window.location.hostname === 'localhost'
  ? `http://${window.location.hostname}:3000/api`
  : 'https://api.codus.arkis.io/api';

/** Most generic function */
async function apiRequest({ endpoint, method, heads, body, store }) { // eslint-disable-line object-curly-newline, max-len
  const headers = {
    Authorization: `Bearer ${store.state.auth.accessToken}`,
    ...heads,
  };
  const url = [
    base.replace(/\/$/g, ''), // Strip trailing slash
    endpoint.replace(/^\//g, ''), // Strip leading slash
  ].join('/');

  return fetch(url, {
    headers, method, body,
  }).then(r => r.json());
}

/** Perform a GET request and return a promise */
export function get({ endpoint, store }) {
  return apiRequest({ endpoint, method: 'GET', store });
}

/** Perform a PUT request with the given body */
export function put({ endpoint, body, contentType = 'application/json', store }) { // eslint-disable-line object-curly-newline, max-len
  const heads = { 'Content-Type': contentType };
  const json = contentType === 'application/json';
  return apiRequest({
    endpoint,
    method: 'PUT',
    heads,
    body: json ? JSON.stringify(body) : body,
    store,
  });
}
