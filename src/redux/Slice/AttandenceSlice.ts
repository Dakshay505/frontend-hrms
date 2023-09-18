import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPunches,
  deletePunches,
  editPunches,
  getAllAttandence,
  getGroupAttendance,
  getMyAttandence,
  getSingleGroupAttendance,
  getStaffAttendance,
  updateAttendance,
} from "../API/AttandenceApi";

const initialState = {
  allAttandence: [],
  myAttandence: [],
  staffAttendance: [],
  groupAttendance: [],
  singleGroupAttendance: [],
  status: "idle",
};

// READ GET ALL ATTANDENCE
export const getAllAttandenceAsync: any = createAsyncThunk(
  "getAllAttandenceAsync",
  async (data) => {
    try {
      console.log("data", data);
      const response: any = await getAllAttandence(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// READ SINGLE GROUP SALARY
export const getSingleGroupAttendanceAsync: any = createAsyncThunk(
  "getSingleGroupAttendanceAsync",
  async (data) => {
    try {
      const response: any = await getSingleGroupAttendance(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// READ
export const getMyAttandenceAsync: any = createAsyncThunk(
  "getMyAttandenceAsync",
  async (data) => {
    try {
      const response: any = await getMyAttandence(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// READ
export const getGroupAttendanceAsync: any = createAsyncThunk(
  "getGroupAttendanceAsync",
  async () => {
    try {
      const response: any = await getGroupAttendance();
      console.log(response);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// READ
export const getStaffAttendanceAsync: any = createAsyncThunk(
  "getStaffAttendanceAsync",
  async () => {
    try {
      const response: any = await getStaffAttendance();
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// UPDATE
export const updateAttendanceAsync: any = createAsyncThunk(
  "updateAttendanceAsync",
  async (data) => {
    try {
      const response: any = await updateAttendance(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const addPunchAsync: any = createAsyncThunk(
  "addPunchAsync",
  async (data) => {
    console.log(data);

    try {
      const response: any = await addPunches(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const editPunchAsync: any = createAsyncThunk(
  "editPunchAsync",
  async (data) => {
    console.log(data);

    try {
      const response: any = await editPunches(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const deletePunchAsync: any = createAsyncThunk(
  "deletePunchAsync",
  async (data) => {
    console.log(data);

    try {
      const response: any = await deletePunches(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const AttandenceSlice = createSlice({
  name: "attandence",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // NEW
      .addCase(getAllAttandenceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllAttandenceAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.allAttandence = action.payload;
        }
      )
      .addCase(getMyAttandenceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getMyAttandenceAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.myAttandence = action.payload.data;
        }
      )
      .addCase(updateAttendanceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAttendanceAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(getStaffAttendanceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getStaffAttendanceAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.staffAttendance = action.payload.data;
        }
      )
      .addCase(getGroupAttendanceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getGroupAttendanceAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.groupAttendance = action.payload.groupPresent;
        }
      )
      .addCase(getSingleGroupAttendanceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getSingleGroupAttendanceAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.singleGroupAttendance = action.payload.attendanceRecords;
        }
      )
      .addCase(addPunchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPunchAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(editPunchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPunchAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(deletePunchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePunchAsync.fulfilled, function (state: any) {
        state.status = "idle";
      });
  },
});

export default AttandenceSlice.reducer;
