import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find(
        (i) => i.product.id === action.payload.id
      );
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ product: action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.product.id !== action.payload);
    },
    increaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQty(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.product.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
  },
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty } =
  cartSlice.actions;
export default cartSlice.reducer;
