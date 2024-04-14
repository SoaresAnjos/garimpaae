import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { act } from "react-dom/test-utils";

//initial state
const initialState = {
  loading: false,
  error: null,
  product: {},
  products: [],
};

export const addProductAction = createAsyncThunk(
  "products",
  async (
    { files, name, brand, category, description, totalQty, price },
    { rejectWithValue, getState, dispatch }
  ) => {
    try {
      //http request
      const { data } = await axios.post(`${baseURL}/products`, {
        files,
        name,
        brand,
        category,
        description,
        totalQty,
        price,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.message);
    }
  }
);

//products slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(addProductAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

//generate reducer
const productsReducer = productsSlice.reducer;

export default productsReducer;
