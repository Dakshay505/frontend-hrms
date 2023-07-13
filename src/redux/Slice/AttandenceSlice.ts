import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllTodayPunches, getMyAttandence, postAttandenceByDate, updateAllTodayPunches } from '../API/AttandenceApi';

const initialState = {
    todaysPunches: [],
    staffAttandence: [],
    myAttandence: [],
    status: 'idle',
};

// READ
export const getAllTodaysPunchesAsync: any = createAsyncThunk(
    'getallTodaysPunches',
    async () => {
        try {
            const response: any = await getAllTodayPunches();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ
export const getMyAttandenceAsync: any = createAsyncThunk(
    'getMyAttandenceAsync',
    async () => {
        try {
            const response: any = await getMyAttandence();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
export const postAttandenceByDateAsync: any = createAsyncThunk(
    'postAttandenceByDate',
    async (data) => {
        try {
            const response: any = await postAttandenceByDate(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// UPDATE
export const updateAllTodaysPunchesAsync: any = createAsyncThunk(
    'updateallTodaysPunches',
    async (data) => {
        try {
            const response: any = await updateAllTodayPunches(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const AttandenceSlice = createSlice({
    name: 'attandence',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllTodaysPunchesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTodaysPunchesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.todaysPunches =  action.payload.employees;
            })
            .addCase(getMyAttandenceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyAttandenceAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.myAttandence =  action.payload.attendanceRecords;
            })
            .addCase(updateAllTodaysPunchesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAllTodaysPunchesAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
            .addCase(postAttandenceByDateAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(postAttandenceByDateAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.staffAttandence = action.payload.employees
            })
    },
});

export default AttandenceSlice.reducer;
    