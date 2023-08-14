import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDocuments,
  addImage,
  createEmployee,
  deleteEmployee,
  getAllEmployee,
  getEmployeeImage,
  getSingleEmployee,
  updateEmployee,
  getQrAssign,
  updatePassword,
  newPassword,
  salaryLog
} from "../API/EmployeeAPI";

const initialState = {
  employees: [],
  singleEmployee: {}, 
  qrAssign: {},
  salaryLogSingleEmployee: [],
  status: "idle",
};

// CREATE
export const createEmployeeAsync: any = createAsyncThunk(
  "createemployees",
  async (data) => {
    try {
      const response: any = await createEmployee(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// READ
export const getAllEmployeeAsync: any = createAsyncThunk(
    'getallemployees',
    async (data) => {
        try {
            const response: any = await getAllEmployee(data);
            return response;
        } catch (error: any) {
            console.log(error.message);
        }
  }

);
// READ SINGLE EMPLOYEE
export const getSingleEmployeeAsync: any = createAsyncThunk(
  "getSingleemployees",
  async (data) => {
    try {
      const response: any = await getSingleEmployee(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// READ SALARY LOG
export const salaryLogAsync: any = createAsyncThunk(
  "salaryLogAsync",
  async (data) => {
    try {
      const response: any = await salaryLog(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// UPDATE
export const updateEmployeeAsync: any = createAsyncThunk(
  "updateemployee",
  async (data) => {
    try {
      const response: any = await updateEmployee(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// DELETE
export const deleteEmployeeAsync: any = createAsyncThunk(
  "deleteemployee",
  async (data) => {
    try {
      const response: any = await deleteEmployee(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const addDocumentsAsync: any = createAsyncThunk(
  "addDocuments",
  async (data) => {
    try {
      const response: any = await addDocuments(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
export const addImageAsync: any = createAsyncThunk("addImage",
 async (data) => {
  try {
    const response: any = await addImage(data);
    return response;
  } catch (error: any) {
    console.log(error.message);
  }
});
export const getEmployeeImageAsync: any = createAsyncThunk(
  "getEmployeeImage",
  async (data) => {
    try {
      const response: any = await getEmployeeImage(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

// QRASSIGN
export const getQrAssignAsync: any = createAsyncThunk(
  'getQrAssignAsync',
  async (data) => {
    try {
      const response = await getQrAssign(data);
      return response;
    } catch (error:any) {
      console.log(error.message);
    }
  }
);

// change password
export const updatePasswordAsync: any = createAsyncThunk(
  'updatePasswordAsync',
  async (data) => {
    try {
      const response = await updatePassword(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
// new password
export const newPasswordAsync: any = createAsyncThunk(
  'newPasswordAsync',
  async (data) => {
    try {
      const response = await newPassword(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);
  

export const EmployeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEmployeeAsync.fulfilled, function (state: any) {
        state.status = "idle";
        // state.employees =  action.payload.employees;
      })
      .addCase(getSingleEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getSingleEmployeeAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.singleEmployee = action.payload.employeeData
        }
      )
      .addCase(updateEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        updateEmployeeAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.singleEmployee = action.payload.employee;
        }
      )
      .addCase(getAllEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllEmployeeAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.employees = action.payload.employees;
        }
      )
      .addCase(deleteEmployeeAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployeeAsync.fulfilled, function (state: any) {
        state.status = "idle";
        state.singleEmployee = {};
      })
      .addCase(addDocumentsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDocumentsAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(addImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addImageAsync.fulfilled, function (state: any) {
        state.status = "idle";
      })
      .addCase(getEmployeeImageAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getEmployeeImageAsync.fulfilled,
        function (state: any, action: any) {
          state.status = "idle";
          state.singleEmployee = {...state.singleEmployee,profileId:action.payload.employee};
        })
      .addCase(salaryLogAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(salaryLogAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.salaryLogSingleEmployee =  action.payload.salaryLog;
      })
      .addCase(getQrAssignAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getQrAssignAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.qrAssign =  action.payload.data;
      }).addCase(updatePasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePasswordAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
      .addCase(newPasswordAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(newPasswordAsync.fulfilled, (state) => {
        state.status = 'idle';
      })
  },
});

export default EmployeeSlice.reducer;
