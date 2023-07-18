import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addTrainingDocuments, addTrainingLinks } from '../API/TrainingApi';

const initialState = {
    status: "idle"
};

// CREATE
export const addTrainingLinksAsync: any = createAsyncThunk(
    'addTrainingLinks',
    async (data) => {
        try {
            const response: any = await addTrainingLinks(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// CREATE
export const addTrainingDocumentsAsync: any = createAsyncThunk(
    'addTrainingDocuments',
    async (data) => {
        try {
            const response: any = await addTrainingDocuments(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const TrainingSlice = createSlice({
    name: 'training',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(addTrainingLinksAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTrainingLinksAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload.employees;
            })
            .addCase(addTrainingDocumentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addTrainingDocumentsAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload.employees;
            })
    },
});

export default TrainingSlice.reducer;
    