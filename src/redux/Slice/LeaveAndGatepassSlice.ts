import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createLeavesAndGatePass, getAllAcceptedGatePass, getAllAcceptedLeaves, getAllApprovedGatePass, getAllApprovedLeaves, getAllPendingGatePass, getAllPendingLeaves, getAllRejectedGatePass, getAllRejectedLeaves, getMyLeavesAndGatePass, updateAcceptedGatePass, updateAcceptedLeaves, updatePendingGatePass, updatePendingLeaves } from '../API/LeaveAndGatepassAPI';

const initialState = {
    // LEAVES
    pendingLeaves: [],
    approvedLeaves: [],
    acceptedLeaves: [],
    rejectedLeaves: [],
    myLeaves: [],
    // GATEPASS
    pendingGatePasses: [],
    approvedGatePasses: [],
    acceptedGatePasses: [],
    rejectedGatePasses: [],
    myGatePass: [],

    // UPPERLEVEL
    upperLevelEmployee: {},
    status: 'idle',
};

// LEAVES
// READ APPROVED LEAVES
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
    async () => {
        try {
            const response: any = await getAllApprovedLeaves();
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
// READ PENDING GATEPASS
export const getAllPendingGatePassAsync: any = createAsyncThunk(
    'getallPendingGatePasses',
    async () => {
        try {
            const response: any = await getAllPendingGatePass();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ APPROVED GATEPASS
export const getAllApprovedGatePassAsync: any = createAsyncThunk(
    'getallApprovedGatePasses',
    async () => {
        try {
            const response: any = await getAllApprovedGatePass();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ ACCEPTED GATEPASS
export const getAllAcceptedGatePassAsync: any = createAsyncThunk(
    'getallAcceptedGatePasses',
    async () => {
        try {
            const response: any = await getAllAcceptedGatePass();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
// READ REJECTED GATEPASS
export const getAllRejectedGatePassAsync: any = createAsyncThunk(
    'getallRejectedGatePasses',
    async () => {
        try {
            const response: any = await getAllRejectedGatePass();
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
    }
);
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
            .addCase(getAllPendingLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllPendingLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.pendingLeaves =  action.payload.pendingLeaveWithFilteredPeriods;
            })
            .addCase(getAllApprovedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllApprovedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.approvedLeaves =  action.payload.allApprovedLeave;
            })
            .addCase(getAllAcceptedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllAcceptedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.acceptedLeaves =  action.payload.acceptedLeaveWithFilteredPeriods;
            })
            .addCase(getMyLeavesAndGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMyLeavesAndGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                console.log(action.payload)
                state.myLeaves =  action.payload.leaves.fromTo;
                state.myGatePass =  action.payload.leaves.gatePass;
                state.upperLevelEmployee = action.payload.upperLevelEmployee
            })
            .addCase(getAllRejectedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllRejectedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.rejectedLeaves =  action.payload.rejectedLeaveWithFilteredPeriods;
            })
            .addCase(updatePendingLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePendingLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.pendingLeaves =  action.payload.updatedPendingLeaveWithFilteredPeriods;
            })
            .addCase(updateAcceptedLeavesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAcceptedLeavesAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.acceptedLeaves =  action.payload.updatedAcceptedLeaveWithFilteredPeriods;
            })
            // GATEPASS
            .addCase(getAllPendingGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllPendingGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.pendingGatePasses =  action.payload.pendingGatePassWithFilteredPeriods;
            })
            .addCase(getAllApprovedGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllApprovedGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.approvedGatePasses =  action.payload.approvedGatePassWithFilteredPeriods;
            })
            .addCase(getAllAcceptedGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllAcceptedGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.acceptedGatePasses =  action.payload.acceptedGatePassWithFilteredPeriods;
            })
            .addCase(getAllRejectedGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllRejectedGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.rejectedGatePasses =  action.payload.rejectedGatePassWithFilteredPeriods;
            })
            .addCase(updatePendingGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePendingGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                console.log("@@@@@@@", action.payload);
                state.pendingGatePasses =  action.payload.updatedPendingGatePassWithFilteredPeriods;
            })
            .addCase(updateAcceptedGatePassAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAcceptedGatePassAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.acceptedGatePasses =  action.payload.updatedacceptedGatePassWithFilteredPeriods;
            })
    },
});

export default LeaveSlice.reducer;