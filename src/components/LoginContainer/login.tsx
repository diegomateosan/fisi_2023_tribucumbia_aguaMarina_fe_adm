import React, { useState } from "react";
import { text } from "stream/consumers";

import { InputDoubleEntries } from "../input/input";
import { Button, LoginWithFB } from "../button/button";
import userService from "../../services/user";

import "./login.css";

export const LoginContainer: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitClick = async (emailValue: string, passwordValue: string) => {
    if (emailValue === "" || passwordValue === "") {
      alert("Password o email en blanco");
    } else {
      const result = await userService.login(emailValue, passwordValue);
      if (!result.success) {
        console.log(result);
        alert(result.message);
      } else {
        localStorage.setItem("token", result.data.token);
        alert("Usuario inició sesión correctamente");
        console.log(result);
        handleauth();
      }
    }
  };

  const loginFB = async () => {};

  const loginGoogle = async () => {};

  return (
    <div className="app-container-login-container">
      <div className="app-container-form">
        <div className="app-container-input">
          <InputDoubleEntries
            placeholder1="Correo electrónico"
            placeholder2="Contraseña"
            inputValue1={email}
            inputValue2={password}
            changeInput1={(text: string) => setEmail(text)}
            changeInput2={(text: string) => setPassword(text)}
          />
        </div>
        <div className="app-container-button">
          <Button
            placeholder="Iniciar Sesión"
            handleClick={() => submitClick(email, password)}
          />
        </div>

        {/*
        <div className="app-container-login-fb">
          <LoginWithFB
            handleLoginWithFB={() => loginFB()}
            handleLoginWithGoogle={() => loginGoogle()}
            placeholder="O inicie sesión con"
          />
        </div>
        */}
      </div>
    </div>
  );
};
