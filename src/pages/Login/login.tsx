import React from "react";
import { LoginContainer } from "../../components/LoginContainer/login";

import "./login.css";

export const Login: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  return (
    <div className="app-container-page-login-container">
      <LoginContainer handleauth={() => handleauth()} />
    </div>
  );
};
