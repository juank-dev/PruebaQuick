import axios from 'axios';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};
let controller = new AbortController();

export const ApiRequest = async (path, { headers = {} }) => {
  try {
    let { data } = await axios.get(path, {
      responseType: 'json',
      headers: { ...headers, 'Content-type': 'application/json' },
    });
    return data;
  } catch (err) {
    throw { message: err.message, name: err.name };
  }
};

export const cancelRequest = () => {
  if (controller) {
    controller.abort();
    controller = new AbortController();
  }
};
