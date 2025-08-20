import { API_BASE_URL } from './services/base';
import { client } from './services/api/gen/client.gen'


client.setConfig({
    baseURL: API_BASE_URL,
    withCredentials: true,
});
