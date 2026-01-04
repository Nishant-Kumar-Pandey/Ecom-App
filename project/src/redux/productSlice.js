import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async () => {
        const res = await fetch("https://dummyjson.com/products"); // Increased limit to show pagination better
        const data = await res.json();
        return data.products;
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        selectedCategory: "All"
    },
    reducers: {
        setSelectedCategory: (state, action) => {
            state.selectedCategory = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = "success";
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.status = "failed";
            });
    }
});

export const { setSelectedCategory } = productSlice.actions;
export { fetchProducts };
export default productSlice;




