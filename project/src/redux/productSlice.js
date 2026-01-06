import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "../config";
import axios from "axios";

const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async (_, { rejectWithValue }) => {
        try {
            // Fetch from our local backend using axios
            const response = await axios.get(`${API_URL}/products`);
            const products = response.data.products;

            if (!Array.isArray(products)) {
                throw new Error("Invalid data format received from server");
            }

            // Map the new data structure with safety checks
            return products.map((item, index) => ({
                id: item.id || index + 1,
                title: item.product_name || "Unknown Product",
                price: item.product_price || 0,
                category: (item.product_category || "Uncategorized").split(' - ')[0],
                rating: item.product_rating || 0,
                thumbnail: `https://placehold.co/600x400?text=${encodeURIComponent(item.product_name || 'Product')}`,
                description: item.product_description || "No description available.",
                discountPercentage: Math.floor(Math.random() * 30), // Mock discount for sorting
                stock: item.product_stock || 0,
                brand: item.product_brand || "Generic", // Map brand
                color: item.product_color || "Unknown" // Map color
            }));
        } catch (error) {
            console.error("Fetch products failed:", error);
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

const productSlice = createSlice({
    name: "products",
    initialState: {
        items: [],
        status: "idle",
        selectedCategory: "All",
        error: null
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
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    }
});

export const { setSelectedCategory } = productSlice.actions;
export { fetchProducts };
export default productSlice;




