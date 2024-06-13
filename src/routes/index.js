import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login";
import AccountVerify from "../components/AccountVerify";
import EmailAuth from "../components/EmailAuth";

export const routes = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "register",
    Component: Register,
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "/verify-account",
    Component: AccountVerify,
  },
  { path: "/auth", Component: EmailAuth },
]);
