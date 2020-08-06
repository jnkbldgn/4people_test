import axios from 'axios';

const API_URL = '/api/v1/';
const transformSuccess = (res) => res.data;
const transformFail = (error) => {
  throw error.response.data;
};

const createAxios = () => {
  const instance = axios.create() || axios;
  instance.interceptors.response.use(transformSuccess, transformFail);
  return instance;
};

const createURL = (url) => `${API_URL}/${url}`.replace(/\/\/+/g, '/');

const instance = createAxios();

export const get = async (url = '', config = {}) => instance.get(createURL(url), config);

export default {
  get,
};
