import React from "react";

import "./button.css";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillGooglePlusCircle } from "react-icons/ai";
import { FaEdit,FaTrashAlt } from "react-icons/fa"; 

export const Button: React.FC<{
  handleClick: () => void;
  placeholder: string;
}> = ({ handleClick, placeholder }) => {
  return (
    <div className="app-container-buttonLogin">
      <button onClick={handleClick}>{placeholder}</button>
    </div>
  );
};

export const ButtonModificar: React.FC<{
  handleClick: () => void;
  placeholder: string;
}> = ({ handleClick, placeholder }) => {
  return (
    <div className="app-container-buttonModificar">
      <FaEdit size={30} />
    </div>
  );
};

export const ButtonEliminar: React.FC<{
  handleClick: () => void;
  placeholder: string;
}> = ({ handleClick, placeholder }) => {
  return (
    <div className="app-container-buttonEliminar">
      <FaTrashAlt size={30} />
    </div>
  );
};


export const LoginWithFB: React.FC<{
  handleLoginWithFB: () => void;
  handleLoginWithGoogle: () => void;
  placeholder: string;
}> = ({ handleLoginWithFB, handleLoginWithGoogle, placeholder }) => {
  return (
    <div className="app-container-log-fb-google">
      <div className="app-container-tittle">
        <hr />
        <label>{placeholder}</label>
        <hr />
      </div>

      <div className="app-container-fb-login">
        <div className="app-container-fb-login-icon">
          <AiFillFacebook size={32} />
        </div>

        <div className="app-container-fb-login-text">
          <label>Iniciar Sesión con Facebook</label>
        </div>
      </div>

      <div className="app-container-google-login">
        <div className="app-container-google-login-icon">
          <AiFillGooglePlusCircle size={32} />
        </div>

        <div className="app-container-google-login-text">
          <label>Iniciar Sesión con Google</label>
        </div>
      </div>
    </div>
  );
};
