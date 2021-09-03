import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  resultMatching: null,
  idExtract: null,
  faceExtract: null,
  hvLoading: false,
  errorMsg: null
};

export const hvSlice = createSlice({
  name: "hv",
  initialState,
  reducers: {
    setResultMatching: (state, action) => {
      state.resultMatching = action.payload;
    },
    setIdExtract: (state, action) => {
      state.idExtract = action.payload;
    },
    setFaceExtract: (state, action) => {
      state.faceExtract = action.payload;
    },
    setHvLoading: (state, action) => {
      state.hvLoading = action.payload;
    },
    setErrorMsg: (state, action) => {
      state.errorMsg = action.payload
    }
  },
});

export const { setResultMatching, setIdExtract, setFaceExtract, setHvLoading } = hvSlice.actions;

//selector
export const selectResultMatching = (state) => state.hv.resultMatching;
export const selectIdExtract = (state) => state.hv.idExtract;
export const selectFaceExtract = (state) => state.hv.faceExtract;
export const selectHvLoading = (state) => state.hv.hvLoading;

export default hvSlice.reducer;

// {
//     faceExtract: {
//       requestId: "1630563828019-610a9b5c-1586-49ed-a128-7cc7af4a08b2",
//       result: {
//         conf: 100,
//         match: "yes",
//         "match-score": 100,
//         match_score: 100,
//         "to-be-reviewed": "no",
//       },
//       status: "success",
//       statusCode: "200",
//     },
//     idExtract: {
//       requestId: "1630563810685-9969a77d-e586-4888-b5cc-0c3a1035ab77",
//       result: [
//         {
//           details: {
//             address: {
//               conf: 0.81,
//               "to-be-reviewed": "no",
//               value: "KALIDORO LOR",
//             },
//             citizenship: {
//               conf: 0.86,
//               "to-be-reviewed": "no",
//               value: "WNI",
//             },
//             district: {
//               conf: 0.98,
//               "to-be-reviewed": "no",
//               value: "JEKULO",
//             },
//             dob: {
//               conf: 0.84,
//               "to-be-reviewed": "no",
//               value: "29-06-2001",
//             },
//             doi: {
//               conf: 1,
//               "to-be-reviewed": "no",
//               value: "22-02-2019",
//             },
//             expiry: {
//               conf: 0.99,
//               "to-be-reviewed": "no",
//               value: "SEUMUR HIDUP",
//             },
//             gender: {
//               conf: 0.9,
//               "to-be-reviewed": "no",
//               value: "LAKI-LAKI",
//             },
//             id: {
//               conf: 0.99,
//               "to-be-reviewed": "no",
//               value: "3319062906010003",
//             },
//             k: {
//               conf: 0.96,
//               "to-be-reviewed": "no",
//               value: "KABUPATEN KUDUS",
//             },
//             k1: {
//               conf: 0.95,
//               "to-be-reviewed": "no",
//               value: "KUDUS",
//             },
//             martial: {
//               conf: 0.99,
//               "to-be-reviewed": "no",
//               value: "BELUM KAWIN",
//             },
//             name: {
//               conf: 0.96,
//               "to-be-reviewed": "no",
//               value: "RAIHAN ARDIANATA",
//             },
//             pob: {
//               conf: 0.84,
//               "to-be-reviewed": "no",
//               value: "KUDUS",
//             },
//             pro: {
//               conf: 0.86,
//               "to-be-reviewed": "no",
//               value: "PROVINSI JAWA TENGAH",
//             },
//             religion: {
//               conf: 0.97,
//               "to-be-reviewed": "no",
//               value: "ISLAM",
//             },
//             rtrw: {
//               conf: 0.93,
//               "to-be-reviewed": "no",
//               value: "003/007",
//             },
//             village: {
//               conf: 0.71,
//               "to-be-reviewed": "yes",
//               value: "BULUNGCANGKRING",
//             },
//             work: {
//               conf: 0.98,
//               "to-be-reviewed": "no",
//               value: "BELUM/TIDAK BEKERJA",
//             },
//           },
//           type: "ktp_front",
//         },
//       ],
//       status: "success",
//       statusCode: "200",
//     },
//   },