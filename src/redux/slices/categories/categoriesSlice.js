import {
  createAsyncThunk,
  createSlice,
  rejectWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import baseURL from "../../../utils/baseURL";
import {
  resetErrAction,
  resetSuccessAction,
} from "../globalActions/globalActions";

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

//fetch categories
export const deleteCategoryAction = createAsyncThunk(
  "category/delete",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //http request
      const { data } = await axios.delete(
        `${baseURL}/categories/delete/${category}`,
        config
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//create category action
export const addCategoryAction = createAsyncThunk(
  "category/create",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const { name, file } = payload;
      //fromData
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", file);
      //Token - Authenticated
      const token = getState()?.users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      //Images
      const { data } = await axios.post(
        `${baseURL}/categories`,
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

    //delete
    builder.addCase(deleteCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isDeleted = true;
      state.category = action.payload;
    });
    builder.addCase(deleteCategoryAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.category = null;
      state.isDeleted = false;
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

    //Reset err
    builder.addCase(resetErrAction.pending, (state) => {
      state.error = null;
    });
    //Reset success
    builder.addCase(resetSuccessAction.pending, (state) => {
      state.isAdded = false;
    });
  },
});

//generate reducer
const categoriesReducer = categorySlice.reducer;

export default categoriesReducer;
