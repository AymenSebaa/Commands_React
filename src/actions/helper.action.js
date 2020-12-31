import *  as api from '../api';
import { DAIRAS, DISTRICTS, UNIQUE, WILAYAS } from '../constants/action.constants';

export const unique = (creds) => async (dispatch) => {
    try {
        const {data} = await api.unique(creds);
        dispatch({type: UNIQUE, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const wilayas = () => async (dispatch) => {
    try {
        const {data} = await api.wilayas();
        dispatch({type: WILAYAS, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const districts = (wilaya_id) => async (dispatch) => {
    try {
        const {data} = await api.districts(wilaya_id);
        dispatch({type: DISTRICTS, payload: data});
    } catch (err) {
        console.log(err);
    }
}

export const dairas = (wilaya_id) => async (dispatch) => {
    try {
        const {data} = await api.dairas(wilaya_id);
        dispatch({type: DAIRAS, payload: data});
    } catch (err) {
        console.log(err);
    }
}