import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        name: "John Doe",
        email: "john.doe@example.com",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        cover: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
        role: "Premium Member",
        location: "New York, USA",
        phone: "+1 234 567 890",
    },
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
        updateProfile: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        }
    }
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice;
