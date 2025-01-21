import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
    music: [],
    musicLoadingStatus: 'idle'
}

export const fetchMusic = createAsyncThunk(
    'music/fetchMusic',
    async () => {
        const { request } = useHttp();
        return await request('http://localhost:3001/music');
    }
);

const musicSlice = createSlice({
    name: 'music',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchMusic.pending, state => {state.musicLoadingStatus = 'loading'})
            .addCase(fetchMusic.fulfilled, (state, action) => {
                state.musicLoadingStatus = 'idle';
                state.music = action.payload;
            })
            .addCase(fetchMusic.rejected, state => {state.musicLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = musicSlice;

export default reducer;
export const {
    musicFetching,
    musicFetched,
    musicFetchingError
} = actions;