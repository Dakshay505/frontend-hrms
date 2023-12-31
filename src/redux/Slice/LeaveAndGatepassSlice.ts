import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createLeavesAndGatePass, getAllAcceptedLeaves, getAllApprovedLeaves, getAllLeavesAndGatePass, getAllPendingLeaves, getAllRejectedLeaves, getMyLeavesAndGatePass, updateAcceptedGatePass, updateAcceptedLeaves, updatePendingGatePass, updatePendingLeaves } from '../API/LeaveAndGatepassAPI';

const initialState = {
    // LEAVES AND GATEPSS
    allLeavesAndGatePass: [],
    // LEAVES
    pendingLeaves: [],
    approvedLeaves: [],
    acceptedLeaves: [],
    rejectedLeaves: [],
    myLeavesAndGatePass: [],
    // UPPERLEVEL
    upperLevelEmployee: {},
    status: 'idle',
};

// LEAVES
// READ MY LEAVES AND GATEPASS
export const getMyLeavesAndGatePassAsync: any = createAsyncThunk(
    'getMyLeavesAndGatepass',
    async () => {
        try {
            const response: any = await getMyLeavesAndGatePass();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ PENDING LEAVES
export const getAllPendingLeavesAsync: any = createAsyncThunk(
    'getallPendingLeaves',
    async () => {
        try {
            const response: any = await getAllPendingLeaves();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ APPROVED LEAVES
export const getAllApprovedLeavesAsync: any = createAsyncThunk(
    'getallApprovedLeaves',
    async (data) => {
        try {
            const response: any = await getAllApprovedLeaves(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ ACCEPTED LEAVES
export const getAllAcceptedLeavesAsync: any = createAsyncThunk(
    'getallAcceptedLeaves',
    async () => {
        try {
            const response: any = await getAllAcceptedLeaves();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ REJECTED LEAVES
export const getAllRejectedLeavesAsync: any = createAsyncThunk(
    'getallRejectedLeaves',
    async () => {
        try {
            const response: any = await getAllRejectedLeaves();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// READ MY LEAVES AND GATEPASS
export const getAllLeavesAndGatePassAsync: any = createAsyncThunk(
    'getAllLeavesAndGatePassAsync',
    async () => {
        try {
            const response: any = await getAllLeavesAndGatePass();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// CREATE LEAVES AND GATEPASS
export const createLeavesAndGatePassAsync: any = createAsyncThunk(
    'createLeavesAndGatepass',
    async (data) => {
        try {
            const response: any = await createLeavesAndGatePass(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// UPDATED PENDING LEAVES
export const updatePendingLeavesAsync: any = createAsyncThunk(
    'updatePendingLeaves',
    async (data) => {
        try {
            const response: any = await updatePendingLeaves(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// UPDATED ACCEPTED LEAVES
export const updateAcceptedLeavesAsync: any = createAsyncThunk(
    'updateAcceptedLeaves',
    async (data) => {
        try {
            const response: any = await updateAcceptedLeaves(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// GATEPASS
// UPDATED PENDING GATEPASS
export const updatePendingGatePassAsync: any = createAsyncThunk(
    'updatePendingGatePass',
    async (data) => {
        try {
            const response: any = await updatePendingGatePass(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

// UPDATED ACCEPTED GATEPASS
export const updateAcceptedGatePassAsync: any = createAsyncThunk(
    'updateAcceptedGatePass',
    async (data) => {
        try {
            const response: any = await updateAcceptedGatePass(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);

export const LeaveSlice = createSlice({
    name: 'leave',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            // LEAVES
            .addCase(getMyLeavesAndGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyLeavesAndGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.myLeavesAndGatePass = action.payload.leaves;
                state.upperLevelEmployee = action.payload.upperLevelEmployee;
            })
            .addCase(getAllPendingLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllPendingLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.pendingLeaves = action.payload.allPendingRequest;
            })
            .addCase(getAllLeavesAndGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllLeavesAndGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.allLeavesAndGatePass = action.payload.allLeaves;
            })
            .addCase(getAllApprovedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllApprovedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.approvedLeaves = action.payload.allApprovedLeave;
            })
            .addCase(getAllAcceptedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllAcceptedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.acceptedLeaves = action.payload.allAcceptedRequest;
            })
            .addCase(getAllRejectedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllRejectedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.rejectedLeaves = action.payload.allRejectedLeave;
            })
            .addCase(updatePendingLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePendingLeavesAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
            .addCase(updateAcceptedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAcceptedLeavesAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
            .addCase(updatePendingGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePendingGatePassAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
            .addCase(updateAcceptedGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAcceptedGatePassAsync.fulfilled, function (state: any) {
                state.status = 'idle';
            })
    },
});

export default LeaveSlice.reducer;