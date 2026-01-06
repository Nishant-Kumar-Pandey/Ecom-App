import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    items: [],
}

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        toggleWishlist: (state, action) => {
            const product = action.payload
            const index = state.items.findIndex((item) => item.id === product.id)
            if (index >= 0) {
                state.items.splice(index, 1)
            } else {
                state.items.push(product)
            }
        },
        removeFromWishlist: (state, action) => {
            const id = action.payload
            state.items = state.items.filter((item) => item.id !== id)
        },
    },
})

export const { toggleWishlist, removeFromWishlist } = wishlistSlice.actions
export default wishlistSlice.reducer
