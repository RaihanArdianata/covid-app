import * as constant from './constant'

export const setResultMatching = (payload) => {
    return {type: constant.SET_RESULT_MATCHING, payload}
}
export const setIdExtract = (payload) => {
    return {type: constant.SET_ID_EXTRACT, payload}
}
export const setFaceExtract = (payload) => {
    return {type: constant.SET_FACE_EXTRACT, payload}
}
export const setHvLoading = (payload) => {
    return {type: constant.SET_HV_LOADING, payload}
}
export const setErrorMsg = (payload) => {
    return {type: constant.SET_ERROR_MSG, payload}
}