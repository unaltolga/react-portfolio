// Talks to the portfolio backend from Assignment 2.
// The address can be changed with VITE_API_URL in a .env file. Without it the live
// server is used, so the deployed site works with no extra settings.
export const API_URL = (
  import.meta.env.VITE_API_URL || 'https://portfolio-backend-sand-three.vercel.app'
).replace(/\/+$/, '');

// Every answer from the backend is JSON: { success, message, data }.
// add, getAll and getById return "data"; update and delete only return the message.
async function request(path, { method = 'GET', body } = {}) {
  const options = { method };

  if (body !== undefined) {
    options.headers = { 'Content-Type': 'application/json' };
    options.body = JSON.stringify(body);
  }

  let response;
  try {
    response = await fetch(`${API_URL}/api/${path}`, options);
  } catch {
    throw new Error('Could not reach the server. Check your connection and try again.');
  }

  let result = null;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok || !result || result.success === false) {
    throw new Error(result?.message || `The request failed (status ${response.status}).`);
  }

  return result;
}

// One function per CRUD operation. "resource" is projects, services, references or users.
export const api = {
  list: (resource) => request(resource).then((result) => result.data),
  get: (resource, id) => request(`${resource}/${encodeURIComponent(id)}`).then((result) => result.data),
  create: (resource, values) =>
    request(resource, { method: 'POST', body: values }).then((result) => result.data),
  update: (resource, id, values) =>
    request(`${resource}/${encodeURIComponent(id)}`, { method: 'PUT', body: values }),
  remove: (resource, id) => request(`${resource}/${encodeURIComponent(id)}`, { method: 'DELETE' })
};
