/* global CODUS_API_BASE */

import store from './vuex';

/** Most generic function */
async function apiRequest({ endpoint, method, heads, body, signal }) {
  const authed = store.getters['auth/isAuthenticated'];
  // If the user was previously logged in but that login expired, renew before making an
  // authenticated API call
  if (authed && store.getters['auth/loginExpired']()) await store.dispatch('auth/renew');

  const headers = {
    ...authed && { Authorization: `Bearer ${store.state.auth.accessToken}` },
    ...heads,
  };

  // We must remove Content-Type header when sending form data so that fetch can send boundary with
  // the automatically-set Content-Type
  if (body instanceof FormData) delete headers['Content-Type'];

  const url = [
    CODUS_API_BASE.replace(/\/$/g, ''), // Strip trailing slash
    endpoint.replace(/^\//g, ''), // Strip leading slash
  ].join('/');

  return fetch(url, {
    headers, method, body, signal,
  })
    .then(r => r.json())
    .then(({ data, error }) => {
      if (error) return Promise.reject(error);
      return data;
    });
}

/** Perform a GET request and return a promise */
export function get({ endpoint, signal }) {
  return apiRequest({ endpoint, method: 'GET', signal });
}

/** Perform a DELETE request and return a promise */
function del({ endpoint, signal }) {
  return apiRequest({ endpoint, method: 'DELETE', signal });
}
export { del as delete };

/**
 * Perform an HTTP request for a method that requires a body like GET or POST, implementing easy
 * JSON support etc
 */
function requestWithBody({ endpoint, body, contentType = 'application/json', method, signal }) {
  const heads = { 'Content-Type': contentType };
  const json = contentType === 'application/json';
  return apiRequest({
    endpoint,
    method,
    heads,
    body: json ? JSON.stringify(body) : body,
    signal,
  });
}

/** Perform a POST request with the given body */
export function post(args) { return requestWithBody({ ...args, method: 'POST' }); }

/** Perform a PUT request with the given body */
export function put(args) { return requestWithBody({ ...args, method: 'PUT' }); }

/** Perform a PATCH request with the given body */
export function patch(args) { return requestWithBody({ ...args, method: 'PATCH' }); }
