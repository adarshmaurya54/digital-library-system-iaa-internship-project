import axios from "axios";

// Create an Axios instance with default settings
const API = axios.create({
  baseURL: import.meta.env.VITE_BASEURL, // Use your environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token automatically
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");
    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

// Export the Axios instance for custom usage
export { API };

// You can now write custom API methods like:
// const response = await API.get("/your-endpoint");
// const response = await API.post("/your-endpoint", data);

