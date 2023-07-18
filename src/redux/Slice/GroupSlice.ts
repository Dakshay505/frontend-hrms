import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createGroup, getAllGroups, getSingleGroup, updateGroup } from '../API/GroupAPI';

const initialState = {
    groups: [],
    status: 'idle',
    group:{}
};

// CREATE
export const createGroupAsync: any = createAsyncThunk(
    'createGroup',
    async (data) => {
        try {
            const response: any = await createGroup(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ
export const getAllGroupsAsync: any = createAsyncThunk(
    'getallGroups',
    async () => {
        try {
            const response: any = await getAllGroups();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
export const updateGroupAsync: any = createAsyncThunk(
    'updateGroup',
    async (groupData) => {
        try {
            const response: any = await updateGroup(groupData);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
export const getSingleGroupAsync: any = createAsyncThunk(
    'getSingleGroup',
    async (data) => {
        try {
            const response: any = await getSingleGroup(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const GroupSlice = createSlice({
    name: 'group',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(createGroupAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createGroupAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload.employees;
            })
            .addCase(getAllGroupsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllGroupsAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.groups =  action.payload.docs;
            })
            .addCase(updateGroupAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateGroupAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                // state.groups =  action.payload;
            })
            .addCase(getSingleGroupAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getSingleGroupAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.group =  action.payload;
            })

    },
});

export default GroupSlice.reducer;
    