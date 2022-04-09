import axios from 'axios';

const httpClient = axios.create({
  baseURL: `${process.env.REACT_APP_CONVERTKIT_API_URL}`,
});

httpClient.defaults.headers.common['Accept'] = 'application/json';
httpClient.defaults.headers.common['Content-Type'] = 'application/json';
httpClient.defaults.timeout = 10000;

 export { httpClient };
