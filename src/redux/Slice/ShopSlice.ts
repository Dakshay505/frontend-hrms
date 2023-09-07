// shopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addShop, allShop, updateShopApi, getSingleShop } from '../API/ShopApi';

const initialState = {
  shop: [],
  status: 'idle',
  error: null,
};

export const createShopAsync: any = createAsyncThunk('createShopAsync', async (newShop) => {
  try {
    const response = await addShop(newShop);
    return response;
  } catch (error: any) {
    return (error.response.data);
  }
});

export const allShopAsync: any = createAsyncThunk('allShopAsync', async () => {
  try {
    const response = await allShop();
    return response;
  } catch (error: any) {
    return (error.response.data);
  }
});

export const updateShopAsync: any = createAsyncThunk(
  'updateShop',
  async (ShopData) => {
    try {
      const response: any = await updateShopApi(ShopData);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

export const getSingleShopAsync: any = createAsyncThunk(
  'getSingleShop',
  async (data) => {
    try {
      const response: any = await getSingleShop(data);
      return response;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createShopAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createShopAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shop = action.payload.newShop;
      })
      .addCase(allShopAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(allShopAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shop = action.payload.shops;
      })
      .addCase(updateShopAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateShopAsync.fulfilled, function (state: any) {
        state.status = 'idle';
      })
      .addCase(getSingleShopAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSingleShopAsync.fulfilled, function (state: any, action: any) {
        state.status = 'idle';
        state.shop = action.payload.shop;
      })

  },
});

export default shopSlice.reducer;
