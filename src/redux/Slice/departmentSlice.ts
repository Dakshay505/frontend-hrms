import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createDepartment,
  createParnetDepartment,
  deleteDepartment,
  getAllDepartment,
  getDepartmentByParent,
  getDepartmentoverview,
  getParentAllDepartment,
  getjobProfileBySubDepartmentName,
  updateDepartment,
  updateParentDepartment,
} from "../API/departmentAPI";

const initialState = {
  department: [],
  parentdepartment: [],
  myDepartment: [],
  departmentJobProfile: [],
  departmentOverview:[],
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
//get all department
export const getDepartmentOverviewAsync: any = createAsyncThunk(
  "getDepartmentOverviewAsync",
  async () => {
    try {
      const response: any = await getDepartmentoverview();
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
export const getDepartmentByParentAsync: any = createAsyncThunk(
  "getDepartmentByParent",
  async (data) => {
    try {
      const response: any = await getDepartmentByParent(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const getjobProfileBySubDepartmentNameAsync: any = createAsyncThunk(
  "getjobProfileBySubDepartmentName",
  async (data) => {
    try {
      const response: any = await getjobProfileBySubDepartmentName(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const updateDepartmentAsync: any = createAsyncThunk(
  'updateDepartmentAsync',
  async (data) => {
    try {
      const response = await updateDepartment(data);
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  }
);

export const updateParentDepartmentAsync: any = createAsyncThunk(
  'updateParentDepartmentAsync',
  async (data) => {
    try {
      const response = await updateParentDepartment(data);
      console.log("llllllllll", response)
      return response;
    } catch (error: any) {
      console.error(error.message);
    }
  }
);


export const deleteDepartmentAsync: any = createAsyncThunk(
  "deleteDepartment",
  async (data) => {
    try {
      const response: any = await deleteDepartment(data);
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
      .addCase(getAllDepartmentAsync.fulfilled,
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
      )
      .addCase(getDepartmentByParentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDepartmentByParentAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.myDepartment = action.payload.allDepartment;
        }
      )
      .addCase(getjobProfileBySubDepartmentNameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getjobProfileBySubDepartmentNameAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.departmentJobProfile = action.payload.jobProfile;
        }
      )

      .addCase(updateDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateDepartmentAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.myDepartment = action.payload;
        }
      )
      .addCase(getDepartmentOverviewAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDepartmentOverviewAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.departmentOverview = action.payload.departmentStore;
        }
      )

      .addCase(updateParentDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateParentDepartmentAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.myDepartment = action.payload;
        }
      )


      .addCase(deleteDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDepartmentAsync.fulfilled, function (state: any) {
        state.status = "idle";
      });
  },
});

export default departmentSlice.reducer;
