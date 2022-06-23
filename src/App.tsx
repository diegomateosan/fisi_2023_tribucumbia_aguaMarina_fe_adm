import React from "react";
import logo from "./logo.svg";

import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

import userService from "./services/user";

import { Login } from "./pages/Admin/Login/login";
import { Home } from "./pages/Admin/Home/home";

function App() {
  const [adminLoggedIn, setadminLoggedIn] = useState(false);

  const VerifyLoggedIn = async () => {
    const resultVerify = await userService.verify();

    console.log("Login state:" + resultVerify);

    resultVerify === true ? setadminLoggedIn(true) : setadminLoggedIn(false);
  };

  useEffect(() => {
    VerifyLoggedIn();
  }, [adminLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        {!adminLoggedIn && (
          <Route
            path="/"
            element={<Login handleauth={() => setadminLoggedIn(true)} />}
          />
        )}

        {adminLoggedIn && (
          <>
            <Route
              path="/home"
              element={<Home handleauth={() => setadminLoggedIn(false)} />}
            />
          </>
        )}

        <Route
          path="*"
          element={<Navigate to={adminLoggedIn ? "/home" : "/"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
