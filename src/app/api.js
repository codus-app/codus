/* eslint-disable object-curly-newline */
const base = !Number.isNaN(parseInt(window.location.hostname, 10)) || window.location.hostname === 'localhost'
  ? `http://${window.location.hostname}:3000/api`
  : 'https://api.codus.arkis.io/api';

/** Most generic function */
async function apiRequest({ endpoint, method, heads, body, store }) {
  // Renew if necessary before making an authenticated API call
  if (!store.getters['auth/loginValid']()) await store.dispatch('auth/renew');

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

/**
 * Perform an HTTP request for a method that requires a body like GET or POST, implementing easy
 * JSON support etc
 */
function requestWithBody({ endpoint, body, contentType = 'application/json', method, store }) {
  const heads = { 'Content-Type': contentType };
  const json = contentType === 'application/json';
  return apiRequest({
    endpoint,
    method,
    heads,
    body: json ? JSON.stringify(body) : body,
    store,
  });
}

/** Perform a PUT request with the given body */
export function put({ endpoint, body, contentType, store }) {
  return requestWithBody({ endpoint, method: 'PUT', body, contentType, store });
}

/** Perform a PATCH request with the given body */
export function patch({ endpoint, body, contentType, store }) {
  return requestWithBody({ endpoint, method: 'PATCH', body, contentType, store });
}
