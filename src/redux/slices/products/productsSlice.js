import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import { fetchBrandsAction } from "../brands/brandsSlice";
import { act } from "react-dom/test-utils";

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

//fetch all products
export const fecthProductsAction = createAsyncThunk(
  "products/fetch-all",
  async ({ url }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${url}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch a single product
export const fetchProductAtion = createAsyncThunk(
  "product/details",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${baseURL}/products/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//delete a single product
export const deleteProductAtion = createAsyncThunk(
  "product/delete",
  async (id, { rejectWithValue, getState }) => {
    //token
    const token = getState().users?.userAuth?.userInfo?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${baseURL}/products/delete/${id}`,
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
    //create product
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
    //fetch all
    builder.addCase(fecthProductsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fecthProductsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fecthProductsAction.rejected, (state, action) => {
      state.loading = false;
      state.products = null;
      state.error = action.payload;
    });

    //fetch single
    builder.addCase(fetchProductAtion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProductAtion.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(fetchProductAtion.rejected, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.product = null;
    });
    //delete single
    builder.addCase(deleteProductAtion.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteProductAtion.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.isDeleted = true;
    });
    builder.addCase(deleteProductAtion.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.product = null;
      state.isDeleted = false;
    });
  },
});

//generate reducer
const productsReducer = productsSlice.reducer;

export default productsReducer;
