import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import FinanceDashboard from "../components/FinanceDashboard";
import OAuthRedirectHandler from "../components/OAuthRedirectHandler";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "financeDashboard",
    element: <FinanceDashboard />,
  },
  {
    path: "auth/google/callback",
    element: <OAuthRedirectHandler />,
  },
]);

export default router;
