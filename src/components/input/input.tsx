import React, { useState } from "react";

import { BsPersonFill } from "react-icons/bs";
import { AiFillLock } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";

import "./input.css";

export const InputDoubleEntries: React.FC<{
  placeholder1: string;
  placeholder2: string;
  inputValue1: string;
  inputValue2: string;
  changeInput1: (text: string) => void;
  changeInput2: (tex: string) => void;
}> = ({
  placeholder1,
  placeholder2,
  inputValue1,
  inputValue2,
  changeInput1,
  changeInput2,
}) => {
  const [clickedIn, setClickedIn] = useState(false);

  const tooglePasswordVisibility = () => {
    if (clickedIn === false) {
      setClickedIn(true);
    } else {
      setClickedIn(false);
    }
  };

  return (
    <div className="app-container">
      <div className="app-container-form">
        <div className="app-container-header">
          <img
            src={require("../../assets/Images/logo Brisas marinas.png")}
            alt="Brisas Marinas Logo"
          />
          <h1>Brisas Marinas</h1>
        </div>

        <div className="app-container-email">
          <BsPersonFill size={22} />
          <label>{placeholder1}</label>
        </div>

        <input
          type="text"
          placeholder="Example: alguien.example@gmail.com"
          value={inputValue1}
          onChange={(event) => changeInput1(event.target.value)}
          required
        />

        <div className="app-container-password">
          <AiFillLock size={22} />
          <label>{placeholder2}</label>
        </div>

        <input
          type={clickedIn ? "text" : "password"}
          placeholder="*******"
          value={inputValue2}
          onChange={(event) => changeInput2(event.target.value)}
        />
        {clickedIn ? (
          <AiFillEye size={22} onClick={tooglePasswordVisibility} />
        ) : (
          <AiFillEyeInvisible size={22} onClick={tooglePasswordVisibility} />
        )}

        <div className="app-container-register">
          <label>¿Olvidaste tu contraseña?</label>
          <a href="*">Haz click aquí</a>
        </div>
      </div>
    </div>
  );
};
