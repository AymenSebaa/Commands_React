import { combineReducers } from 'redux';
import auth from './auth.reducer';
import helper from './helper.reducer';

export default combineReducers({
    auth, helper
});