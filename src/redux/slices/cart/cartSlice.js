import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//initial state
const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  isAdded: false,
  isUpdated: false,
  isDeleted: false,
};

//add product to cart
export const addOrderAction = createAsyncThunk("cart/add", async (cartItem) => {
  const cartItems = localStorage.getItem("cartItem")
    ? JSON.parse(localStorage.getItem("cartItem"))
    : [];

  //push to storage
  cartItems.push(cartItem);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
});

//get producots from cart
export const getCartItemsAction = createAsyncThunk("cart/get", async () => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  return cartItems;
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  extraReducers: (builder) => {
    //add to cart
    builder.addCase(addOrderAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addOrderAction.fulfilled, (state, action) => {
      state.loading = false;
      state.isAdded = true;
      state.cartItems = action.payload;
    });
    builder.addCase(addOrderAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.error = action.payload;
    });
    //get cart items
    builder.addCase(getCartItemsAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCartItemsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    });
    builder.addCase(getCartItemsAction.rejected, (state, action) => {
      state.loading = false;
      state.cartItems = null;
      state.cartItems = action.payload;
    });
  },
});

const cartReducer = cartSlice.reducer;

export default cartReducer;
