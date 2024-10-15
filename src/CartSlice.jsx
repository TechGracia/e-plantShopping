import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        // Add item to the cart
        addItem: (state, action) => {
            const { name, image, cost } = action.payload;
            const existingItem = state.items.find(item => item.name === name);
            if (existingItem) {
                existingItem.quantity++; // Increment quantity if the item already exists
            } else {
                state.items.push({ name, image, cost, quantity: 1 }); // Add new item with quantity 1
            }
        },
        // Remove item from the cart
        removeItem: (state, action) => {
            state.items = state.items.filter(item => item.name !== action.payload); // Remove item by name
        },
        // Update quantity of a specific item in the cart
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload; // Destructure name and quantity from the payload
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                itemToUpdate.quantity = quantity; // Update quantity if item exists
            }
        },
    },
});

// Export the actions to be used in the component
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer to be used in the store
export default CartSlice.reducer;
