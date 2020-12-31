import { LOGIN, REGISTER, SAVE_USER_INFO, LOGOUT } from '../constants/action.constants';

const reducer = (auth = {}, action) => {
    switch(action.type){
        case LOGIN: 
            return action.payload;
        case REGISTER:
            return action.payload;
        case SAVE_USER_INFO: 
            return action.payload;
        case LOGOUT: 
            return {};  
        default:
            return auth;    
    }
}

export default reducer;