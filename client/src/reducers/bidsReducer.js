import {
    GET_BIDS,
    CLEAR_CURRENT_BIDS
} from '../actions/types';

const initialState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
                    
        case GET_BIDS:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case CLEAR_CURRENT_BIDS:
            return {
                ...state,
                profile: null
            };
        default:
            return state;
    }
}
