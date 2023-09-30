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




export const changePasswordAsync:any = createAsyncThunk(
  'changePasswordAsync',
  async ( employeeId:any, password:any ) => {
    try {
      const response = await changePasswordAPI(employeeId, password);
      console.log("sliec data",response)
      return response;
    } catch (error) {
      throw error;
    }
  }
)





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
        console.log("payload", action.payload)
        state.data = action.payload;
      })
      .addCase(fetchLoggedInHistory.rejected, (state: any, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

       .addCase(changePasswordAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = '';
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.successMessage = action.payload.message;
      })
      .addCase(changePasswordAsync.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.successMessage = '';
      });

  },
});

export default loggedInHistorySlice.reducer;
