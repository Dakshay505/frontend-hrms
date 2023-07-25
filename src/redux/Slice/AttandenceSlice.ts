import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllAttandence, getAllTodayPunches, getMyAttandence, getPresentBelow, updateAttendance } from '../API/AttandenceApi';

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
export const getMyAttandenceAsync: any = createAsyncThunk(
    'getMyAttandenceAsync',
    async (data) => {
        try {
            const response: any = await getMyAttandence(data);
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
export const updateAttendanceAsync: any = createAsyncThunk(
    'updateAttendanceAsync',
    async (data) => {
        try {
            const response: any = await updateAttendance(data);
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
            .addCase(getMyAttandenceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyAttandenceAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.myAttandence = action.payload.data;
            })
            .addCase(updateAttendanceAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAttendanceAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })

            // OLD
            .addCase(getAllTodaysPunchesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllTodaysPunchesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.todaysPunches = action.payload.employees;
            })
            .addCase(getPresentBelowAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getPresentBelowAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.presentBelow = action.payload;
            })
    },
});

export default AttandenceSlice.reducer;
