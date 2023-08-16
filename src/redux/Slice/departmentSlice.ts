import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  createParnetDepartment,
  getAllDepartment,
  getParentAllDepartment,
} from "../API/departmentAPI";

const initialState = {
  department: [],
  parentdepartment: [],
  status: "idle",
};

// CREATE
export const createDepartmentAsync: any = createAsyncThunk(
  "createDepartment",
  async (data) => {
    try {
      const response: any = await createDepartment(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const createParentDepartmentAsync: any = createAsyncThunk(
  "createParentDepartmentAsync",
  async (data) => {
    try {
      const response: any = await createParnetDepartment(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

//get all department
export const getAllDepartmentAsync: any = createAsyncThunk(
  "getAllDepartment",
  async () => {
    try {
      const response: any = await getAllDepartment();
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
//get all parent department
export const getAllParentDepartmentAsync: any = createAsyncThunk(
  "getAllParentDepartmentAsync",
  async () => {
    try {
      const response: any = await getParentAllDepartment();
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const departmentSlice = createSlice({
  name: "department",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDepartmentAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(createParentDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createParentDepartmentAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(getAllDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllDepartmentAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.department = action.payload.allDepartment;
        }
      )
      .addCase(getAllParentDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllParentDepartmentAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.parentdepartment = action.payload.allParentDepartment;
        }
      );
  },
});

export default departmentSlice.reducer;
