import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        addItem: (state, action) => {
            const item = action.payload;

            // Check if the item already exists in the cart
            const existingItem = state.items.find((i) => i.name === item.name);
            if (existingItem) {
                // If it exists, increase its quantity
                existingItem.quantity += 1;
            } else {
                // If it doesn't exist, add it with a quantity of 1
                state.items.push({ ...item, quantity: 1 });
            }
        },
        removeItem: (state, action) => {
            const itemName = action.payload;

            // Filter out the item that needs to be removed
            state.items = state.items.filter((item) => item.name !== itemName);
        },
        updateQuantity: (state, action) => {
            const { itemName, quantity } = action.payload;

            // Find the item and update its quantity
            const existingItem = state.items.find((item) => item.name === itemName);
            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
    },
});

// Export the actions to be used in the component
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be used in the store
export default CartSlice.reducer;
