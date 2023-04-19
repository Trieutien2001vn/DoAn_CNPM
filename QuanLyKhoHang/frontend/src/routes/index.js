import HomePage from "../pages/home/HomePage";
import ChangePasswordPage from "../pages/Login/ChangePasswordPage";
import LoginPage from "../pages/Login/LoginPage";
import VerifyEmailPage from "../pages/register/VerifyEmailPage";
import PrivateRoute from "./PrivateRoute";
import RestrictedRoute from "./RestrictedRoute";

const restrictedRoutes = [
  {
    id: "login",
    path: "/login",
    page: (
      <RestrictedRoute>
        <LoginPage />
      </RestrictedRoute>
    ),
  },
  {
    id: "verify-email",
    path: "/verify-email",
    page: (
      <RestrictedRoute>
        <VerifyEmailPage />
      </RestrictedRoute>
    ),
  },
  {
    id: "verify-code",
    path: "/verify-code",
    page: (
      <RestrictedRoute>
        <VerifyEmailPage isForgotPassword />
      </RestrictedRoute>
    ),
  },
  {
    id: "change-password",
    path: "/change-password",
    page: (
      <RestrictedRoute>
        <ChangePasswordPage />
      </RestrictedRoute>
    ),
  },
];
const privateRoutes = [
  {
    id: "homepage",
    path: "/",
    page: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
];

export { restrictedRoutes, privateRoutes };
