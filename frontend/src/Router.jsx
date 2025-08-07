import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import PublicRoute from "./components/Routes/PublicRoute";
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import Contact from "./pages/Contact"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/Routes/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home />},
      { path:"/about", element: <PublicRoute><About /></PublicRoute>},
      { path:"/contact", element: <PublicRoute><Contact /></PublicRoute> },
      { path:"/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path:"/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path:"/signup", element: <PublicRoute><Signup /></PublicRoute> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <PublicRoute><Signup /></PublicRoute>,
  },
//   {
//     path: "*",
//     element: <PageNotFound />,
//   },
]);

export default router;