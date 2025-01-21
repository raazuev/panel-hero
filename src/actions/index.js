// import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/HeroesSlice";
// import { musicFetching, musicFetched, musicFetchingError } from "../components/trackList/TrackSlice";
import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/HeroesFiltersSlice";

// /// HEROES ACQUISITION
// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }

// /// MUSIC ACQUISITION
// export const fetchMusic = (request) => (dispatch) => {
//     dispatch(musicFetching());
//     request('http://localhost:3001/music')
//         .then(data => dispatch(musicFetched(data)))
//         .catch(() => dispatch(musicFetchingError()))
// }

// /// FILTERS ACQUISITION
// export const fetchFilters = (request) => (dispatch) => {
//     dispatch(filtersFetching());
//     request("http://localhost:3001/filters")
//         .then(data => dispatch(filtersFetched(data)))
//         .catch(() => dispatch(filtersFetchingError()))
// }


// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }


// export const musicFetching = () => {
//     return {
//         type: 'MUSIC_FETCHING'
//     }
// }

// export const musicFetched = (music) => {
//     return {
//         type: 'MUSIC_FETCHED',
//         payload: music,
//     }
// }

// export const musicFetchingError = () => {
//     return {
//         type: 'MUSIC_FETCHING_ERROR'
//     }
// }


// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const activeFilterChanged = (filter) => {
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }

// /// CHARACTER CREATION AND DELETION
// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }