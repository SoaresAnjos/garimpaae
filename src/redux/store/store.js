import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../slices/users/usersSlice";
import productsReducer from "../slices/products/productsSlice";
import categoriesReducer from "../slices/categories/categoriesSlice";
import colorsReducer from "../slices/colors/colorsSlice";
import brandsReducer from "../slices/brands/brandsSlice";

//store
const store = configureStore({
  reducer: {
    users: usersReducer,
    products: productsReducer,
    categories: categoriesReducer,
    colors: colorsReducer,
    brands: brandsReducer,
  },
});

export default store;