import axios from 'axios';

const url = 'http://localhost:8000';
// const online = 'https://aa-commandes.000webhostapp.com';
const api = url+'/api';
// auth
export const login = (creds) => axios.post(api+'/login', creds);
export const register = (creds) => axios.post(api+'/register', creds);
export const saveUserInfo = (creds) => axios.post(api+'/saveUserInfo', creds);
export const logout = (token) => axios.post(api+'/logout', token);

// helper
export const unique = (creds) => axios.post(api+'/unique', creds);
export const wilayas = () => axios.get(api+'/wilayas');
export const districts = (wilaya_id) => axios.post(api+'/districts', wilaya_id);
export const dairas = (wilaya_id) => axios.post(api+'/dairas', wilaya_id);

