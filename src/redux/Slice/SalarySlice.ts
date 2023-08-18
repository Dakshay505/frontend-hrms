import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllGroupSalary, getSalaryBySubDepartment, getSingleGroupSalary } from '../API/SalaryAPI';

const initialState = {
   allGroupsSalary: [],
   singleGroupsSalary: [],
   salaryOfSubDepartment:[],
   status: 'idle',
};

// READ
export const getAllGroupSalaryAsync: any = createAsyncThunk(
    'getAllGroupSalaryAsync',
    async (data) => {
        try {
            const response: any = await getAllGroupSalary(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ
export const getSingleGroupSalaryAsync: any = createAsyncThunk(
    'getSingleGroupSalaryAsync',
    async (data) => {
        try {
            const response: any = await getSingleGroupSalary(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
export const getSalaryBySubDepartmentAsync: any = createAsyncThunk(
    'getSalaryBySubDepartment',
    async (data) => {
        try {
            const response: any = await getSalaryBySubDepartment(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const SalarySlice = createSlice({
    name: 'salary',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllGroupSalaryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllGroupSalaryAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.allGroupsSalary =  action.payload;
            })
            .addCase(getSingleGroupSalaryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleGroupSalaryAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.singleGroupsSalary =  action.payload.attendanceRecords;
            })
            .addCase(getSalaryBySubDepartmentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSalaryBySubDepartmentAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.salaryOfSubDepartment =  action.payload.dep;
            })
    },
});

export default SalarySlice.reducer;