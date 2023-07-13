import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createJobProfiles, getAllJobProfiles } from '../API/JobProfileAPI';

const initialState = {
    jobProfiles: [],
    status: 'idle',
};

// CREATE
export const createJobProfileAsync: any = createAsyncThunk(
    'createJobProfiles',
    async (data) => {
        try {
            const response: any = await createJobProfiles(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ
export const getAllJobProfileAsync: any = createAsyncThunk(
    'getJobProfiles',
    async () => {
        try {
            const response: any = await getAllJobProfiles();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);


export const JobProfileSlice = createSlice({
    name: 'jobProfile',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createJobProfileAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createJobProfileAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.jobProfiles =  action.payload.docs;
            })
            .addCase(getAllJobProfileAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllJobProfileAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.jobProfiles =  action.payload.docs;
            })
    },
});

export default JobProfileSlice.reducer;
    