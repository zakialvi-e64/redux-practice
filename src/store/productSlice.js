import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import statusCode from "../utils/statusCode";

const initialState = {
  data: [],
  status: statusCode.IDLE,
};
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.status = statusCode.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = statusCode.IDLE;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = statusCode.ERROR;
      })
  }
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const response = await axios.get("https://dummyjson.com/products");
  const result = response.data.products;
  return result;
});

// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const response = await axios.get("https://dummyjson.com/products");
//     const result = response.data.products;
//     dispatch(fetchProducts(result));
//   }
// }