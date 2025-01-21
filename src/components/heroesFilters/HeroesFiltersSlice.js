import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
};

export const fetchFilters = createAsyncThunk(
    'filters/fetchFilters',
    async () => {
        const { request } = useHttp();
        const baseUrl = process.env.REACT_APP_BASE_URL || '';
        return await request(`${baseUrl}/filters`);
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => { state.filtersLoadingStatus = 'loading'; })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                state.filters = action.payload;
            })
            .addCase(fetchFilters.rejected, (state, action) => {
                state.filtersLoadingStatus = 'error';
                console.error('Error fetching filters:', action.error.message);
            });
    }
});

const { actions, reducer } = filtersSlice;

export default reducer;
export const { filtersChanged } = actions;
