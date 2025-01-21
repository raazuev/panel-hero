import { configureStore } from '@reduxjs/toolkit';
import filters from '../components/heroesFilters/HeroesFiltersSlice';
import music from '../components/trackList/TrackSlice';
import { apiSlice } from '../components/api/apiSlice';

const stringMiddleware = () => (next) => (action) => {
    if (typeof action === 'string') {
        return next({
            type: action
        })
    }

    return next(action)
};

const store = configureStore({
    reducer: { filters, 
                music, 
                [apiSlice.reducerPath]: apiSlice.reducer},
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware, apiSlice.middleware),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;