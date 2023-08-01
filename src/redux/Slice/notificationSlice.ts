import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ShowNotifications } from "../API/notificationsApi";

export const fetchNotifications: any = createAsyncThunk(
  "notifications/fetchNotifications",
  async (id) => {
    const response = await ShowNotifications(id); // Pass the id directly instead of an object
    return response;
  }
);

const NotificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearNotifications: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearNotifications } = NotificationsSlice.actions;
export default NotificationsSlice.reducer;
