import axios from 'axios';
const ROOT_URL = 'http://127.0.0.1:8000';

function headersFromToken(token) {
  return token ? { "Authorization" : `Token ${token}`} : null
}

export function fetch(endpoint, page) {
  const url = page ? `${ROOT_URL}/${endpoint}/?page=${page}` : `${ROOT_URL}/${endpoint}/`;
  return axios.get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
}

export function create(endpoint, values, token) {
  const headers = headersFromToken(token);
  return axios.post(`${ROOT_URL}/${endpoint}/`, values, { headers })
            .then(response => ({ response }))
            .catch(error => ({ error }));
}

export function get(endpoint, id) {
  return axios.get(`${ROOT_URL}/${endpoint}/${id}/`)
            .then(response => ({ response }))
            .catch(error => ({ error }));
}

export function destroy(endpoint, id, token) {
  const headers = headersFromToken(token);
  return axios.delete(`${ROOT_URL}/${endpoint}/${id}/`, { headers })
            .then(response => ({ response }))
            .catch(error => ({ error }));
}

export function update(endpoint, id, values, token) {
  const headers = headersFromToken(token);
  return axios.patch(`${ROOT_URL}/${endpoint}/${id}/`, values, { headers })
            .then(response => ({ response }))
            .catch(error => ({ error }));
}
