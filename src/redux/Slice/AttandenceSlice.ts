import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAttandence, getAllTodayPunches, getMyAttandence, getPresentBelow, updateAllTodayPunches } from '../API/AttandenceApi';

const initialState = {
    allAttandence: [],
    todaysPunches: [],
    myAttandence: [],
    presentBelow: [],
    status: 'idle',
};

// READ GET ALL ATTANDENCE 
export const getAllAttandenceAsync: any = createAsyncThunk(
    'getAllAttandenceAsync',
    async (data) => {
        try {
            const response: any = await getAllAttandence(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

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
// READ
export const getPresentBelowAsync: any = createAsyncThunk(
    'getPresentBelowAsync',
    async () => {
        try {
            const response: any = await getPresentBelow();
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
            // NEW
            .addCase(getAllAttandenceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllAttandenceAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.allAttandence = action.payload
            })
            
            // OLD
            .addCase(getAllTodaysPunchesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTodaysPunchesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.todaysPunches = action.payload.employees;
            })
            .addCase(getMyAttandenceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyAttandenceAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.myAttandence = action.payload.attendanceRecords;
            })
            .addCase(getPresentBelowAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPresentBelowAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.presentBelow = action.payload;
            })
            .addCase(updateAllTodaysPunchesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAllTodaysPunchesAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
    },
});

export default AttandenceSlice.reducer;
