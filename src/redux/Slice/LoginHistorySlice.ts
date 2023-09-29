// loggedInHistorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchLoggedInHistoryAPI } from '../API/LoginHistroyApi';

export const fetchLoggedInHistory: any = createAsyncThunk(
    'fetchLoggedInHistory',
    async () => {
        try {
            const response: any = await fetchLoggedInHistoryAPI();
            console.log(response)
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);




const loggedInHistorySlice = createSlice({
    name: 'loggedInHistory',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoggedInHistory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLoggedInHistory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("payload",action.payload)
                state.data = action.payload;
            })
            .addCase(fetchLoggedInHistory.rejected, (state: any, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default loggedInHistorySlice.reducer;
