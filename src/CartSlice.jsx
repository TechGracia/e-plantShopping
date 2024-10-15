import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
    },
    reducers: {
        addItem(state, action) {
            state.items.push(action.payload);
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
        // Other reducers can be added here...
    },
});

// Selector to get the total quantity of items in the cart
export const selectTotalQuantity = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0); // Sum up quantities
};

// Exporting actions and the reducer
export const { addItem, removeItem, updateQuantity } = cartSlice.actions; // Ensure all actions are exported
export default cartSlice.reducer;
