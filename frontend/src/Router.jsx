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
import UploadedMaterails from "./pages/UploadedMaterails";
import PageNotFound from "./pages/PageNotFound";
import AdminApproval from "./pages/AdminApproval";
import AdminUsers from "./pages/AdminUsers";
import Approved_Rejected from "./pages/Approved_Rejected";
import ViewMaterial from "./pages/ViewMaterial";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home />},
      { path:"/about", element: <About />},
      { path:"/contact", element: <Contact />},
      { path:"/dashboard", element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
      { path:"/upload-history", element: <ProtectedRoute><UploadedMaterails /></ProtectedRoute> },
      { path:"/manage-users", element: <ProtectedRoute><AdminUsers /></ProtectedRoute> },
      { path:"/publish", element: <ProtectedRoute><AdminApproval /></ProtectedRoute> },
      { path:"/profile", element: <ProtectedRoute><Profile /></ProtectedRoute> },
      { path:"/approved_rejected", element: <ProtectedRoute><Approved_Rejected /></ProtectedRoute> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path:"/signup", element: <PublicRoute><Signup /></PublicRoute> },
      { path:"/view", element: <ViewMaterial /> },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;