import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Profile from "./components/Profile/Profile";
import Tasks from "./components/Tasks/Tasks";
import Guard from "./components/Guard/Guard";
import GuardInverse from "./components/GuardInverse/GuardInverse";
import { GoogleOAuthProvider } from "@react-oauth/google";

const routes = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "login",
        element: (
          <GuardInverse>
            <Login />
          </GuardInverse>
        ),
      },
      {
        path: "register",
        element: (
          <GuardInverse>
            <Register />
          </GuardInverse>
        ),
      },
      {
        path: "profile",
        element: (
          <Guard>
            <Profile />{" "}
          </Guard>
        ),
      },
      {
        path: "tasks",
        element: (
          <Guard>
            <Tasks />
          </Guard>
        ),
      },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <GoogleOAuthProvider clientId="336014810709-n50q2ohjhitbi1a15iu14jhvtkqqp3ru.apps.googleusercontent.com">
        <RouterProvider router={routes}></RouterProvider>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
