import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api";

export const checkAuthStatus = createAsyncThunk("auth/checkAuthStatus", async (_, { rejectWithValue }) => {
    try {
        const accessToken = Cookies.get("accessToken");

        if (!accessToken) {
            return rejectWithValue("No token found");
        }

        const response = await api.get("/api/auth/profile", {
            headers: { Authorization: `Bearer ${accessToken}` },
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        return rejectWithValue("Invalid or expired token");
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isAuthenticated = false;
                state.loading = false;
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
