import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createJobProfiles,
  deleteDepartmentToJobProfile,
  deleteJobProfile,
  getAllJobProfiles,
  getSingleJobProfile,
  updateJobProfile,
  updateJobProfileDepartment,
} from "../API/JobProfileAPI";

const initialState = {
  jobProfiles: [],
  jobProfileData: {},
  status: "idle",
};

// CREATE
export const createJobProfileAsync: any = createAsyncThunk(
  "createJobProfiles",
  async (data) => {
    try {
      const response: any = await createJobProfiles(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const getSingleJobProfileAsync: any = createAsyncThunk(
  "getSingleJobProfile",
  async (data) => {
    try {
      const response: any = await getSingleJobProfile(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const updateJobProfileAsync: any = createAsyncThunk(
  "updateJobProfile",
  async (data) => {
    try {
      const response: any = await updateJobProfile(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const updateJobProfileDepartmentAsync: any = createAsyncThunk(
  "updateJobProfileDepartment",
  async (data) => {
    try {
      const response: any = await updateJobProfileDepartment(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const deleteDepartmentToJobProfileAsync: any = createAsyncThunk(
  "deleteDepartmentToJobProfile",
  async (data) => {
    try {
      const response: any = await deleteDepartmentToJobProfile(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// READ
export const getAllJobProfileAsync: any = createAsyncThunk(
  "getJobProfiles",
  async () => {
    try {
      const response: any = await getAllJobProfiles();
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const deleteJobProfileAsync: any = createAsyncThunk(
  "deleteJobProfile",
  async (id) => {
    try {
      const response: any = await deleteJobProfile(id);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const JobProfileSlice = createSlice({
  name: "jobProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createJobProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJobProfileAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(getAllJobProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllJobProfileAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.jobProfiles = action.payload.docs;
        }
      )
      .addCase(getSingleJobProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getSingleJobProfileAsync.fulfilled,
        (state: any, action: any) => {
          state.status = "idle";
          state.jobProfileData = action.payload.jobProfileData;
        }
      )
      .addCase(updateJobProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJobProfileAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(updateJobProfileDepartmentAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateJobProfileDepartmentAsync.fulfilled,
        function (state: any) {
          state.status = "idle";
        }
      )
      .addCase(deleteDepartmentToJobProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteDepartmentToJobProfileAsync.fulfilled,
        function (state: any) {
          state.status = "idle";
        }
      )
      .addCase(deleteJobProfileAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJobProfileAsync.fulfilled, function (state: any) {
        state.status = "idle";
      });
  },
});

export default JobProfileSlice.reducer;
