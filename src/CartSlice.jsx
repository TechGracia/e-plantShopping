import { createSlice } from '@reduxjs/toolkit';

export const selectTotalQuantity = (state) => {
    return state.cart.items.reduce((total, item) => total + item.quantity, 0);
};

const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
        // totalQuantity: 0, // You can remove this if you are calculating it on the fly
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
            // Optionally update totalQuantity if you keep it in state
            // state.totalQuantity++; 
        },
        // Remove item from the cart
        removeItem: (state, action) => {
            const itemToRemove = state.items.find(item => item.name === action.payload);
            if (itemToRemove) {
                // Optionally update totalQuantity if you keep it in state
                // state.totalQuantity -= itemToRemove.quantity; 
            }
            state.items = state.items.filter(item => item.name !== action.payload); // Remove item by name
        },
        // Update quantity of a specific item in the cart
        updateQuantity: (state, action) => {
            const { name, quantity } = action.payload; // Destructure name and quantity from the payload
            const itemToUpdate = state.items.find(item => item.name === name);
            if (itemToUpdate) {
                // Optionally update totalQuantity if you keep it in state
                // state.totalQuantity += quantity - itemToUpdate.quantity; // Update total quantity
                itemToUpdate.quantity = quantity; // Update quantity if item exists
            }
        },
    },
});

// Export the actions to be used in the component
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the selector
export { selectTotalQuantity };

// Export the reducer to be used in the store
export default CartSlice.reducer;
