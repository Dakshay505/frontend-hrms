import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addWorkDay, getWorkDay, updateWorkDay } from '../API/WorkdayApi';

const initialState = {
  workingData: [],
  status: 'idle',
  error: null,
};

export const createWorkDayAsync: any = createAsyncThunk('createWorkDayAsync', async (data) => {
  try {
    const response = await addWorkDay(data);
    return response;
  } catch (error: any) {
    return (error.response.data);
  }
});
export const updateWorkDayAsync: any = createAsyncThunk('updateWorkDayAsync', async (data) => {
  try {
    const response = await updateWorkDay(data);
    return response;
  } catch (error: any) {
    return (error.response.data);
  }
});
export const getWorkDayAsync: any = createAsyncThunk('getWorkDayAsync', async (data) => {
  try {
    const response = await getWorkDay(data);
    return response;
  } catch (error: any) {
    return (error.response.data);
  }
});
const workDaySlice = createSlice({
    name: 'shop',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(createWorkDayAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(createWorkDayAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          
        })
        .addCase(updateWorkDayAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(updateWorkDayAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          
        })
        .addCase(getWorkDayAsync.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(getWorkDayAsync.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.workingData= action.payload.workingData;
        })
    }
});
export default workDaySlice.reducer
