import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-f39e1.firebaseio.com/'
})

export default instance;