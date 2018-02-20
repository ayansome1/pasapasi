import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://project-1349411853757439003.firebaseio.com/'
});

export default instance;