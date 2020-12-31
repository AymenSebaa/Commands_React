import { DAIRAS, DISTRICTS, UNIQUE, WILAYAS } from '../constants/action.constants';

const reducer = (helper = [], action) => {
    switch(action.type){
        case UNIQUE:
            return {type: UNIQUE, data: action.payload};
        case WILAYAS: 
            return {type: WILAYAS, data: action.payload};
        case DISTRICTS:
            return {type: DISTRICTS, data: action.payload};
        case DAIRAS:
            return {type: DAIRAS, data: action.payload};
        default:
            return helper;    
    }
}

export default reducer;