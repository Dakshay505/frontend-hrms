import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateHierarchyDepartment, updateHierarchyJobProfile } from '../API/updateHierarchy';

const initialState = {
    updatedHierarchy: [],
    status: 'idle',
};

// UPDATE
export const updateHierarchyJobProfileAsync: any = createAsyncThunk(
    'updateHierarchyJobProfile',
    async (data) => {
        try {
            const response: any = await updateHierarchyJobProfile(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// UPDATE
export const updateHierarchyDepartmentAsync: any = createAsyncThunk(
    'updateHierarchyDepartment',
    async (data) => {
        try {
            const response: any = await updateHierarchyDepartment(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const updateHierarchySlice = createSlice({
    name: 'updateHierarchy',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateHierarchyJobProfileAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateHierarchyJobProfileAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.jobProfiles =  action.payload.docs;
            })
            .addCase(updateHierarchyDepartmentAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateHierarchyDepartmentAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.jobProfiles =  action.payload.docs;
            })
    },
});

export default updateHierarchySlice.reducer;
