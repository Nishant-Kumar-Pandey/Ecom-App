import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: [],
    reducers: {
        addToCart: (state, action) => {
            const itemIndex = state.findIndex((item) => item.id === action.payload.id);
            if (itemIndex >= 0) {
                state[itemIndex].quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            return state.filter((item) => item.id !== action.payload);
        },
        decrementQuantity: (state, action) => {
            const itemIndex = state.findIndex((item) => item.id === action.payload);
            if (itemIndex >= 0) {
                if (state[itemIndex].quantity > 1) {
                    state[itemIndex].quantity -= 1;
                } else {
                    return state.filter((item) => item.id !== action.payload);
                }
            }
        },
        clearCart: (state) => {
            state.splice(0, state.length);
        }
    }
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } = cartSlice.actions;
export default cartSlice;