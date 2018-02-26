import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost/pasapasi/api'
});

export default instance;