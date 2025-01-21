// const initialState = {
//     music: [],
//     musicLoadingStatus: 'idle'
// }

// const music = (state = initialState, action) => {
//     switch (action.type) {
//         case 'MUSIC_FETCHING':
//             return {
//                 ...state,
//                 musicLoadingStatus: 'loading'
//             };
//         case 'MUSIC_FETCHED':
//             return {
//                 ...state,
//                 music: action.payload,
//                 musicLoadingStatus: 'idle'
//             };
//         case 'MUSIC_FETCHING_ERROR':
//             return {
//                 ...state,
//                 musicLoadingStatus: 'error'
//             };
//         default:
//             return state;
//     }
// };

// export default music;