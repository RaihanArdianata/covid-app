import axios from "../httpConfig";
import {
  setIdExtract,
  setFaceExtract,
  setResultMatching,
  setErrorMsg
} from "../../redux/hyperverge/actions";
import store from "../../redux/storeV2";
import { APPID, APPKEY } from "@env";

const {dispatch} = store

export const READ_KTP = async (payload) => {
  try {
    let { data } = await axios({
      method: "POST",
      url: "https://indonesia-ktp.hyperverge.co/v1/readKTP",
      headers: {
        appId: APPID,
        appKey: APPKEY,
      },
      data: payload,
    });
    // console.log(data, "id");
    return dispatch(setIdExtract(data));
} catch (error) {
    return error;
  }
};

export const FACE_MATCH = async (payload) => {
  try {
    let { data } = await axios({
      method: "POST",
      url: "https://apac.faceid.hyperverge.co/v1/photo/verifyPair",
      headers: {
        appId: APPID,
        appKey: APPKEY,
      },
      data: payload,
    });
    // console.log(data, "face");
    return dispatch(setFaceExtract(data));
  } catch (error) {
    return error;
  }
};

export const RESULT_MATCHING = async ({faceImage, idImage}) => {
  console.log("check");
  try {
    let IdExtract = await axios({
      method: "POST",
      url: "https://indonesia-ktp.hyperverge.co/v1/readKTP",
      headers: {
        appId: APPID,
        appKey: APPKEY,
      },
      data: idImage,
    });

    let FaceExtract= await axios({
      method: "POST",
      url: "https://apac.faceid.hyperverge.co/v1/photo/verifyPair",
      headers: {
        appId: APPID,
        appKey: APPKEY,
      },
      data: faceImage,
    });

    await dispatch(setIdExtract(IdExtract.data));
    await dispatch(setFaceExtract(FaceExtract.data));
    return dispatch(setResultMatching({idExtract: IdExtract.data, faceExtract: FaceExtract.data}))
  } catch ({ response }) {
    return dispatch(setErrorMsg(response.data))
  }
}
