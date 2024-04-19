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
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        name,
        description,
        category,
        sizes,
        brand,
        colors,
        price,
        totalQty,
        files,
      } = payload;
      //http request

      //token
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //formData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("totalQty", totalQty);
      formData.append("price", price);

      sizes?.forEach((size) => {
        formData.append("sizes", size);
      });
      colors?.forEach((color) => {
        formData.append("color", color);
      });
      files?.forEach((file) => {
        formData.append("files", file);
      });

      const { data } = await axios.post(
        `${baseURL}/products`,
        formData,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
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
