import *  as api from '../api';
import { LOGIN, LOGOUT, REGISTER } from '../constants/action.constants';

export const login = (creds) => async (dispatch) => {
    try {
        const {data} = await api.login(creds);
        dispatch({type: LOGIN, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const register = (creds) => async (dispatch) => {
    try {
        const {data} = await api.register(creds);
        dispatch({type: REGISTER, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const logout = (token) => async (dispatch) => {
    try {
        const {data} = await api.logout(token);
        dispatch({type: LOGOUT, payload: data});
    } catch (err) {
        console.log(err);
    }
}

