import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createDepartment, getAllDepartments, getSingleDepartment, updateDepartment } from '../API/DepartmentAPI';

const initialState = {
    departments: [],
    status: 'idle',
    department:{}
};

// CREATE
export const createDepartmentAsync: any = createAsyncThunk(
    'createDepartment',
    async (data) => {
        try {
            const response: any = await createDepartment(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ
export const getAllDepartmentsAsync: any = createAsyncThunk(
    'getallDepartments',
    async () => {
        try {
            const response: any = await getAllDepartments();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
export const updateDepartmentAsync: any = createAsyncThunk(
    'updateDepartment',
    async (departmentData) => {
        try {
            const response: any = await updateDepartment(departmentData);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
export const getSingleDepartmentAsync: any = createAsyncThunk(
    'getSingleDepartment',
    async (data) => {
        try {
            const response: any = await getSingleDepartment(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const DepartmentSlice = createSlice({
    name: 'department',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDepartmentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createDepartmentAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.departments =  action.payload.employees;
            })
            .addCase(getAllDepartmentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllDepartmentsAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.departments =  action.payload.docs;
            })
            .addCase(updateDepartmentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateDepartmentAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.departments =  action.payload;
            })
            .addCase(getSingleDepartmentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleDepartmentAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.department =  action.payload;
            })

    },
});

export default DepartmentSlice.reducer;
    