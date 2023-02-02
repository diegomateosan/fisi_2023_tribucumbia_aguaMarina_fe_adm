import React, { useState } from "react";
import { text } from "stream/consumers";

import { Button, LoginWithFB } from "../button/button";
import userService from "../../services/user";

import { InputDefault, InputPassword } from "../inputContainer/input";

import "./login.css";

export const LoginContainer: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const [email, setEmail] = useState("jordy.mayhuay@gmail.com");
  const [emailState, setEmailState] = useState(false);
  const [password, setPassword] = useState("jordy1234");
  const [passwordState, setPasswordState] = useState(false);

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
        window.location.reload();
      }
    }
  };

  return (
    <div className="app-container-login-container">
      <div className="app-container-linput">
        <div className="app-container-header">
          <img
            src={require("../../assets/Images/logo Brisas marinas.png")}
            alt="Brisas Marinas Logo"
          />
          <h1>Brisas Marinas</h1>
        </div>
      </div>

      <div className="app-container-login-input-forms">
        <InputDefault
          estado={emailState}
          campo={email}
          cambiarEstado={(txt: boolean) => setEmailState(txt)}
          cambiarCampo={(txt: string) => setEmail(txt)}
          tipo="text"
          label="Correo Electronico"
          placeholder="Example : alguien@gmail.com"
          leyendaError="El correo no tiene con la estructura correcta"
          expresionRegular={/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
        />

        <InputPassword
          estado={passwordState}
          campo={password}
          cambiarEstado={(txt: boolean) => setPasswordState(txt)}
          cambiarCampo={(txt: string) => setPassword(txt)}
          label="Password"
          placeholder="Debe contener entre 8 a 20 caracteres"
          leyendaError="La contraseña debe contener entre 8 a 20 caracteres."
          expresionRegular={/^.{4,25}$/}
        />
      </div>

      <div className="app-container-register">
        <label>¿Olvidaste tu contraseña?</label>
        <a href="*">Haz click aquí</a>
      </div>

      <div className="app-container-login-button">
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
  );
};
