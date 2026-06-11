import { TouristPlace } from "@/types/allTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  cartItems: TouristPlace[];
  totalItems: number;
  totalPrice: number;
};

const initialState: CartState = {
  cartItems: [],
  totalItems: 0,
  totalPrice: 0,
};

function recompute(state: CartState) {
  state.totalItems = state.cartItems.length;
  state.totalPrice = state.cartItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<TouristPlace>) => {
      // Avoid duplicate packages in the cart.
      const exists = state.cartItems.some(
        (item) => item._id === action.payload._id
      );
      if (!exists) state.cartItems.push(action.payload);
      recompute(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload
      );
      recompute(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      recompute(state);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
