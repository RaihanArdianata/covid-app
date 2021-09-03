import * as constant from './constant'

const initialState = {
    resultMatching: null,
    idExtract: null,
    faceExtract: null,
    hvLoading: false,
    errorMsg: null
};

const hvReducer = (state = initialState, action) => {
    switch (action.type) {
        case constant.SET_ERROR_MSG:
            return{
                ...state, errorMsg : action.payload
            };
        case constant.SET_FACE_EXTRACT:
            return{
                ...state, faceExtract : action.payload
            };
        case constant.SET_ID_EXTRACT:
            return{
                ...state, idExtract : action.payload
            };
        case constant.SET_HV_LOADING:
            return{
                ...state, hvLoading : action.payload
            };
        case constant.SET_RESULT_MATCHING:
            return{
                ...state, resultMatching : action.payload
            }
        default:
            return state;
    }
}

export default hvReducer