import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addPunches,
  deletePunches,
  editPunches,
  getAllAttandence,
  getAllPunchInPunchOut,
  getGroupAttendance,
  getGroupAttendances,
  getMyAttandence,
  getShopFilterAttendance,
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
  punchInPunchOut: [],
  groupOverView: [],
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
export const getAllPunchInPunchOutAsync: any = createAsyncThunk(
  "getAllPunchInPunchOutAsync",
  async () => {
    try {
      const response: any = await getAllPunchInPunchOut();
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const getShopFilterAttandenceAsync: any = createAsyncThunk(
  "getShopFilterAttandenceAsync",
  async (data) => {
    try {
      const response: any = await getShopFilterAttendance(data);
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
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const getGroupAttendancesAsync: any = createAsyncThunk(
  "getGroupAttendancesAsync",
  async (Data) => {
    try {
      const response: any = await getGroupAttendances(Data);
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
      .addCase(getAllPunchInPunchOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllPunchInPunchOutAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.punchInPunchOut = action.payload;
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
      })
      .addCase(getShopFilterAttandenceAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getShopFilterAttandenceAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.allAttandence = action.payload;
        }
      )
      .addCase(getGroupAttendancesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getGroupAttendancesAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.groupOverView = action.payload.groupStore;
        }
      );
  },
});

export default AttandenceSlice.reducer;
