// loggedInHistorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { changePasswordAPI, fetchLoggedInHistoryAPI } from '../API/LoginHistroyApi';

export const fetchLoggedInHistory: any = createAsyncThunk(
  'fetchLoggedInHistory',
  async (limit, page) => {
    try {
      const response = await fetchLoggedInHistoryAPI(limit, page);
      return response;
    } catch (error: any) {
      return (error.message);
    }
  }
);



export const changePasswordAsync : any= createAsyncThunk(
  'changePasswordAsync',
  async (employeeId:any) => {
    try {
      const response = await changePasswordAPI(employeeId);
      return response;
    } catch (error) {
      return (error);
    }
  }
);


const loggedInHistorySlice = createSlice({
  name: 'loggedInHistory',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    loading: false,
    successMessage: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInHistory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInHistory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchLoggedInHistory.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(changePasswordAsync.fulfilled, (state:any) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePasswordAsync.rejected, (state:any, action:any) => {
        state.loading = false;
        state.error = action.payload.message;
      });

  },
});

export default loggedInHistorySlice.reducer;
