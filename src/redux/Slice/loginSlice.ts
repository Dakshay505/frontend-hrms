import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { adminLogin, employeeLogin, getLoggedInUserData, logoutUser } from '../API/LoginAPI';

const initialState = {
    loggedInUserData: null,
    status: 'idle',
};
// READ
export const getAdminLoginAsync: any = createAsyncThunk(
    'adminLogin',
    async (data) => {
        try {
            const response: any = await adminLogin(data);
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);
// READ
export const getEmployeeLoginAsync: any = createAsyncThunk(
    'employeeLogin',
    async (data) => {
        try {
            const response: any = await employeeLogin(data);
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);
// READ
export const getLoggedInUserDataAsync: any = createAsyncThunk(
    'getLoggedInUserDataLogin',
    async () => {
        try {
            const response: any = await getLoggedInUserData();
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);

// LOGOUT
export const logoutUserAsync: any = createAsyncThunk(
    'getUserLogout',
    async () => {
        try {
            const response: any = await logoutUser();
            return response;
        } catch (error:any) {
            if (error.response && (error.response.status === 400 || error.response.status === 404)) {
              console.log(error.response.data.message);
            } else if (error.response && error.response.data) {
              console.log(error.response.data);
            } else {
              console.log(error.toString());
            }
          }
    }
);


export const LoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getLoggedInUserDataAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getLoggedInUserDataAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.loggedInUserData =  action.payload;
            })
            .addCase(getAdminLoginAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAdminLoginAsync.fulfilled, function (state: any, action: any) {
                state.status = 'idle';
                state.loggedInUserData =  action.payload;
            })
            .addCase(logoutUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutUserAsync.fulfilled, function (state: any) {
                state.status = 'idle';
                state.loggedInUserData = null;
            })
    },
});

export default LoginSlice.reducer;
    