import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.100.1.6:3333'
});

export default api;