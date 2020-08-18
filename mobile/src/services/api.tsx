import axios from 'axios';

const api = axios.create({
    baseURL: 'http://100.100.1.9:3333'
});

export default api;