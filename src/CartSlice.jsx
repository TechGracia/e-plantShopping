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
        // other reducers...
    },
});

// Selector to get the total quantity of items in the cart
export const selectTotalQuantity = (state) => state.cart.items.length;

// Exporting actions and the reducer
export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
