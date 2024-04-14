import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";

//initial state
const initialState = {
  loading: false,
  error: null,
  product: {},
  products: [],
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//create product action
export const addProductAction = createAsyncThunk(
  "products/create",
  async ({ payload }, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        brand,
        category,
        sizes,
        colors,
        description,
        totalQty,
        price,
      } = payload;
      //http request
      //token
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { res } = await axios.post(
        `${baseURL}/products`,
        {
          name,
          brand,
          category,
          sizes,
          colors,
          description,
          totalQty,
          price,
        },
        config
      );
      return res;
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
    builder.addCase(addProductAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.product = action.payload;
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.product = null;
      state.isAdded = false;
    });
  },
});

//generate reducer
const productsReducer = productsSlice.reducer;

export default productsReducer;
