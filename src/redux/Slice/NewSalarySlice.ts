// salarySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMonthlyReportsApi, getNewSalaryDataApi } from '../API/NewSalaryApi';


const initialState = {
  data: null,
  status: 'idle',
  error: null,
  loading: false,
  successMessage: '',
};





export const getAllSalaryAsync:any = createAsyncThunk(
  "getAllSalaryAsync",
  async (Data) => {
    try {
      const response: any = await getNewSalaryDataApi(Data);
      return response; 
    } catch (error:any) {
      return (error.message);
    }
  }
);




export const getAllMonthlyReportAsync:any = createAsyncThunk(
  "getAllMonthlyReportAsync",
  async (Data) => {
    try {
      const response: any = await getMonthlyReportsApi(Data);
      return response; 
    } catch (error:any) {
      return (error.message);
    }
  }
);





export const NewSalarySlice = createSlice({
  name: "NewSalarySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSalaryAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllSalaryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(getAllSalaryAsync.rejected, (state: any, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(getAllMonthlyReportAsync.pending, (state) => {
        state.status = "loading";
        state.error = null; 
      })
      .addCase(getAllMonthlyReportAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.data = action.payload;
      })
      .addCase(getAllMonthlyReportAsync.rejected, (state: any, action) => {
        state.status = "loading";
        state.error = action.payload;
      });
  },
});

export default NewSalarySlice.reducer;
