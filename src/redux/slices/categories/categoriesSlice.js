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
  category: {},
  categories: [],
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//fetch categories
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch All",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      //http request
      const { data } = await axios.get(`${baseURL}/categories`);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create category action
export const addCategoryAction = createAsyncThunk(
  "category/create",
  async ({ payload }, { rejectWithValue, getState, dispatch }) => {
    try {
      const { name } = payload;
      //http request
      //token
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { res } = await axios.post(
        `${baseURL}/categories`,
        {
          name,
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
const categorySlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    //create
    builder.addCase(addCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.category = action.payload;
    });
    builder.addCase(addCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.category = null;
      state.isAdded = false;
    });

    //fetch all
    builder.addCase(fetchCategoriesAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.isAdded = true;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.categories = null;
      state.error = action.payload;
    });
  },
});

//generate reducer
const categoriesReducer = categorySlice.reducer;

export default categoriesReducer;
