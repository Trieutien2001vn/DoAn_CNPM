import axios from 'axios';
import { BASE_URL } from './constants';
import { store } from '~/redux/reducrers/root';

// axios public
const axiosPublic = axios.create({
  baseURL: BASE_URL,
});

// axios private
const axiosPrivate = axios.create({
  baseURL: BASE_URL,
});
axiosPrivate.interceptors.request.use(
  async function (config) {
    const auth = await store.getState().auth.login.user.accessToken;

    config.headers.Authorization = `Bearer ${auth}`;
    return config;
  },
  function (error) {
    // Làm gì đó với lỗi request
    return Promise.reject(error);
  }
);

export { axiosPublic, axiosPrivate };
