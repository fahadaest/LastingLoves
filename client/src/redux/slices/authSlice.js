import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../api";
import store from "../store";

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
        authStatus: "idle",
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
            state.authStatus = "idle";
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuthStatus.pending, (state) => {
                state.loading = true;
                state.authStatus = "pending";
            })
            .addCase(checkAuthStatus.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.loading = false;
                state.authStatus = "fulfilled";
            })
            .addCase(checkAuthStatus.rejected, (state) => {
                state.isAuthenticated = false;
                state.loading = false;
                state.authStatus = "rejected";
            });
    },
});

export const refetchProfile = async () => {
    try {
        await store.dispatch(checkAuthStatus());
    } catch (error) {
        console.error("Error refetching profile:", error);
    }
};

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
