// shopSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addShop,allShop } from '../API/ShopApi';

const initialState = {  
  shop: [], 
  status: 'idle',
  error: null,
}; 

export const createShopAsync:any = createAsyncThunk('createShopAsync', async (newShop) => {
  try {
    const response = await addShop(newShop);
    return response;
  } catch (error:any) {
    return (error.response.data);
  }
});

export const allShopAsync:any = createAsyncThunk('allShopAsync', async () => {
  try {
    const response = await allShop();
    return response;
  } catch (error:any) {
    return (error.response.data);
  }
});



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
      
     

  },
});

export default shopSlice.reducer;
