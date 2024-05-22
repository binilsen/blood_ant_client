import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../components/Register";
import Login from "../components/Login";
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
]);
