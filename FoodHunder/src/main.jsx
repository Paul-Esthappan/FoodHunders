import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import "./index.css";

import ErrorPage from "./Errorpage";

import Form from "./modules/Authorizarion/Form";
import Home from "./modules/Home/Home";
import Auth from "./modules/Authorizarion/Auth";
import { persistor, store } from "./redux/store";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import LoginPages from "./modules/Authorizarion/test";
import Profile from "./modules/profile/Profile";
import Search from "./modules/Search/Search";
import { Video } from "./components/Video";
import { SingleVideo } from "./components/SingleVideo";
import Edit from "./modules/profile/Edit";




const PriviteRoute = ({children}) =>{
  //const isUserLoggedIn = window.localStorage.getItem('token') || false
  const isFormPage = window.location.pathname.includes('account')
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;
  console.log("accesstoken istobe",token);

  if (isLoggedIn && !isFormPage) {
    return children;
  } else if (!isLoggedIn && isFormPage) {
    return children;
  } else {
    const redirectURL = isLoggedIn ? "/" : "/account/signin";
    return <Navigate to={redirectURL} replace />;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PriviteRoute>
        <Home type="random" />
      </PriviteRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: (
      <PriviteRoute>
        <Home type="random" />
      </PriviteRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/trending",
    element: (
      <PriviteRoute>
        <Home type="trending" />
      </PriviteRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/subscribed",
    element: (
      <PriviteRoute>
        <Home type="subscribed" />
      </PriviteRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/savedvideos",
    element: (
      <PriviteRoute>
        <Home type="savedvideos" />
      </PriviteRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/account/signin",
    element: (
      <PriviteRoute>
        <Auth />
      </PriviteRoute>
    ),
  },
  {
    path: "/account/signup",
    element: (
      <PriviteRoute>
        <Auth />
      </PriviteRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PriviteRoute>
        <Profile />
      </PriviteRoute>
    ),
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/SingleVideo/:id",
    element: <SingleVideo />,
  },
  {
    path: "/profile/edit",
    element: (
      <PriviteRoute>
        <Edit />
      </PriviteRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
