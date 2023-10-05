// salarySlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getNewSalaryDataApi } from '../API/NewSalaryApi';


const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  

  export const getAllSalaryAsync: any = createAsyncThunk(
    "getAllSalaryAsync",
    async () => {
      try {
        const data: any = await getNewSalaryDataApi();
        return data;
      } catch (error: any) {
        console.log(error.message);
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
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllSalaryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllSalaryAsync.rejected, (state:any, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
  });

  export default NewSalarySlice.reducer;
