import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalQuantity: 0
  },
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.name === newItem.name);
      
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1
        });
        state.totalQuantity += 1;
      } else {
        existingItem.quantity++;
        state.totalQuantity++;
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);
      
      if (existingItem) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
      }
    },
    removeItem: (state, action) => {
      const itemToRemove = action.payload;
      const existingItem = state.items.find(item => item.name === itemToRemove.name);
      
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.name !== itemToRemove.name);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    }
  }
});

export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;