import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem(state, action) {
            const item = action.payload;
            const existingItem = state.items.find(existing => existing.name === item.name);
            if (existingItem) {
                // If item already exists, increase the quantity
                existingItem.quantity += item.quantity;
            } else {
                // If item does not exist, add it to the cart with quantity
                state.items.push({ ...item, quantity: item.quantity });
            }
        },
        removeItem(state, action) {
            state.items = state.items.filter(item => item.name !== action.payload.name);
        },
        updateQuantity(state, action) {
            const { name, quantity } = action.payload;
            const item = state.items.find(item => item.name === name);
            if (item) {
                item.quantity = quantity; // Update the item's quantity
            }
        },
    },
});

// Selector to get the total quantity of items in the cart
export const selectTotalQuantity = (state) => {
    return state.cart.items.reduce((total, item) => total + (item.quantity || 0), 0); // Sum up quantities
};

// Exporting actions and the reducer
export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
