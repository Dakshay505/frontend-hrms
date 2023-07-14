import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addDocuments, createEmployee, deleteEmployee, getAllEmployee, getSingleEmployee, updateEmployee } from '../API/EmployeeAPI';

const initialState = {
    employees: [],
    singleEmployee: {},
    status: 'idle',
};

// CREATE
export const createEmployeeAsync: any = createAsyncThunk(
    'createemployees',
    async (data) => {
        try {
            const response: any = await createEmployee(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ
export const getAllEmployeeAsync: any = createAsyncThunk(
    'getallemployees',
    async () => {
        try {
            const response: any = await getAllEmployee();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ SINFLE EMPLOYEE
export const getSingleEmployeeAsync: any = createAsyncThunk(
    'getSingleemployees',
    async (data) => {
        try {
            const response: any = await getSingleEmployee(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// UPDATE
export const updateEmployeeAsync: any = createAsyncThunk(
    'updateemployee',
    async (data) => {
        try {
            const response: any = await updateEmployee(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// DELETE
export const deleteEmployeeAsync: any = createAsyncThunk(
    'deleteemployee',
    async (data) => {
        console.log("111", data);
        try {
            const response: any = await deleteEmployee(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const addDocumentsAsync: any = createAsyncThunk(
    'addDocuments',
    async (data) => {
        try {
            const response: any = await addDocuments(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);


export const EmployeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createEmployeeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createEmployeeAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.employees =  action.payload.employees;
            })
            .addCase(getSingleEmployeeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleEmployeeAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.singleEmployee =  action.payload.employeeData;
            })
            .addCase(updateEmployeeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateEmployeeAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                console.log(action.payload)
                state.singleEmployee =  action.payload.employee;
            })
            .addCase(getAllEmployeeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllEmployeeAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.employees =  action.payload.employees;
            })
            .addCase(deleteEmployeeAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteEmployeeAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                state.singleEmployee =  {};
            })
            .addCase(addDocumentsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addDocumentsAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
    },
});

export default EmployeeSlice.reducer;