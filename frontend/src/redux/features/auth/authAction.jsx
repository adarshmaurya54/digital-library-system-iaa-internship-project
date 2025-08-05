import { createAsyncThunk } from "@reduxjs/toolkit"; //used to perform asynchronous tasks in a slice
import { API } from "../../../services/apiService"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//login
// login
export const userLogin = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        const toastId = toast.loading("Please wait...");
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}auth/user/login/`, { email, password });

            // storing the token that generated when we request to login api
            if (data.success) {
                localStorage.setItem("token", data.token); // data.token, we getting this from the authController.js file from the loginController.
                toast.success(data.message, { id: toastId });
            } else {
                toast.error(data.message, { id: toastId });
                return rejectWithValue(data.message); // Ensure rejection for unsuccessful response
            }
            return data;
        } catch (error) {

            // Handle server error (like 500 status)
            if (error.response) {
                toast.error(error.response.data.message, { id: toastId });
                return rejectWithValue(error.response.data.message);
            } else {
                toast.error("Something went wrong. Please try again later.", { id: toastId });
                return rejectWithValue(error.message);
            }
        }
    }
);

//register
export const userRegister = createAsyncThunk(
    "auth/register",
    async (
        {
            firstName, lastName, email, password, cPassword, role
        },
        { rejectWithValue }
    ) => {
        const toastId = toast.loading("Please wait...");
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BASEURL}auth/user/registration/`, {
                firstName,
                lastName,
                email,
                password,
                cPassword,
                role
            });
            if (data.success) {
                toast.success(data.message, { id: toastId });
            }
            return data;
        } catch (error) {
            if (error.response) {
                const errorMessage = error.response.data.message || "Registration failed.";

                toast.error(errorMessage, {id: toastId}); // Show proper error message
                return rejectWithValue(errorMessage);
            } else {
                toast.error("Something went wrong. Please try again later.", {id: toastId});
                return rejectWithValue(error.message);
            }
        }
    }
);

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.get("/auth/current-user");
            if (res?.data) {
                return res.data; // Return only user data
            } else {
                return rejectWithValue("Failed to fetch user data");
            }
        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data.error || "Server error");
            } else {
                return rejectWithValue("Something went wrong. Please try again.");
            }
        }
    }
);