import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productsReducer from "../slices/products/productsSlice";
import categoriesReducer from "../slices/categories/categoriesSlice";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
  },
});

export default store;
