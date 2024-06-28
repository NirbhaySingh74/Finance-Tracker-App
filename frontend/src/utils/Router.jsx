import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import FinanceDashboard from "../components/FinanceDashboard";
import OAuthRedirectHandler from "../components/OAuthRedirectHandler";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="login" element={<Login />} />
      <Route path="financeDashboard" element={<FinanceDashboard />} />
      <Route path="auth/google/callback" element={<OAuthRedirectHandler />} />
    </Route>
  )
);

export default router;
