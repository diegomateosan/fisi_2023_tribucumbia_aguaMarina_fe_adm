import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { FiCheckSquare, FiSquare } from "react-icons/fi";

import "./input.css";

export const InputDefault: React.FC<{
  estado: boolean;
  campo: any;
  cambiarEstado: (text: boolean) => void;
  cambiarCampo: (text: string) => void;
  tipo: string;
  label: string;
  placeholder: string;
  leyendaError: string;
  expresionRegular: RegExp;
}> = ({
  estado,
  campo,
  cambiarEstado,
  cambiarCampo,
  tipo,
  label,
  placeholder,
  leyendaError,
  expresionRegular,
}) => {
  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(campo)) {
        cambiarEstado(true);
      } else {
        cambiarEstado(false);
      }
    }
  };

  const MostrarIcono = () => {
    if (campo !== "") {
      if (estado === true) {
        return <FaCheckCircle size={25} className="icon-check" />;
      } else {
        return <AiFillCloseCircle size={25} className="icon-error" />;
      }
    } else {
      return (
        <div>
          <div></div>
        </div>
      );
    }
  };

  const MostrarError = () => {
    if (campo !== "") {
      if (estado === false) {
        return <label>{leyendaError}</label>;
      } else {
        <div> </div>;
      }
    }
  };

  return (
    <div className="app-container-input">
      <div className="app-container-input-icon">
        <div className="app-container-input-label">
          <label>{label}</label>
        </div>
        <div className="app-container-inputAndIcon">
          <input
            type={tipo}
            placeholder={placeholder}
            value={campo}
            onChange={(event) => cambiarCampo(event.target.value)}
            onKeyUp={validacion}
            onBlur={validacion}
          />
          <div className="app-container-icon">{MostrarIcono()}</div>
        </div>
        <div className="app-container-showError">{MostrarError()}</div>
      </div>
    </div>
  );
};

export const InputPassword: React.FC<{
  estado: boolean;
  campo: string;
  cambiarEstado: (text: boolean) => void;
  cambiarCampo: (text: string) => void;
  label: string;
  placeholder: string;
  leyendaError: string;
  expresionRegular: RegExp;
}> = ({
  estado,
  campo,
  cambiarEstado,
  cambiarCampo,
  label,
  placeholder,
  leyendaError,
  expresionRegular,
}) => {
  const [clickedIn, setClickedIn] = useState(false);

  const tooglePasswordVisibility = () => {
    if (clickedIn === false) {
      setClickedIn(true);
    } else {
      setClickedIn(false);
    }
  };

  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(campo)) {
        cambiarEstado(true);
      } else {
        cambiarEstado(false);
      }
    }
  };

  const MostrarIcono = () => {
    if (campo !== "") {
      if (estado === true) {
        return <FaCheckCircle size={25} className="icon-check" />;
      } else {
        return <AiFillCloseCircle size={25} className="icon-error" />;
      }
    } else {
      return (
        <div>
          <div></div>
        </div>
      );
    }
  };

  const MostrarError = () => {
    if (campo !== "") {
      if (estado === false) {
        return <label>{leyendaError}</label>;
      } else {
        <div> </div>;
      }
    }
  };

  return (
    <div className="app-container-input">
      <div className="app-container-input-icon">
        <div className="app-container-input-label">
          <label>{label}</label>
        </div>
        <div className="app-container-inputAndIcon">
          <input
            type={clickedIn ? "text" : "password"}
            placeholder={placeholder}
            value={campo}
            onChange={(event) => cambiarCampo(event.target.value)}
            onKeyUp={validacion}
            onBlur={validacion}
          />
          <div className="app-container-icon">{MostrarIcono()}</div>
        </div>
        <div className="app-container-showError">{MostrarError()}</div>

        <div className="app-container-tooglePassword">
          {clickedIn ? (
            <FiCheckSquare size={18} onClick={tooglePasswordVisibility} />
          ) : (
            <FiSquare size={18} onClick={tooglePasswordVisibility} />
          )}

          <label>Mostrar contraseña</label>
        </div>
      </div>
    </div>
  );
};

export const InputNumber: React.FC<{
  estado: boolean;
  campo: string;
  cambiarEstado: (text: boolean) => void;
  cambiarCampo: (text: string) => void;
  label: string;
  placeholder: string;
  leyendaError: string;
  expresionRegular: RegExp;
}> = ({
  estado,
  campo,
  cambiarEstado,
  cambiarCampo,
  label,
  placeholder,
  leyendaError,
  expresionRegular,
}) => {
  const validacion = () => {
    if (expresionRegular) {
      if (expresionRegular.test(campo)) {
        cambiarEstado(true);
      } else {
        cambiarEstado(false);
      }
    }
  };

  const MostrarIcono = () => {
    if (campo !== "") {
      if (estado === true) {
        return <FaCheckCircle size={25} className="icon-check" />;
      } else {
        return <AiFillCloseCircle size={25} className="icon-error" />;
      }
    } else {
      return (
        <div>
          <div></div>
        </div>
      );
    }
  };

  const MostrarError = () => {
    if (campo !== "") {
      if (estado === false) {
        return <label>{leyendaError}</label>;
      } else {
        <div> </div>;
      }
    }
  };

  return (
    <div className="app-container-input">
      <div className="app-container-input-icon">
        <div className="app-container-input-label">
          <label>{label}</label>
        </div>
        <div className="app-container-inputAndIcon">
          <input
            step="0.01"
            placeholder={placeholder}
            value={campo}
            onChange={(event) => cambiarCampo(event.target.value)}
            onKeyUp={validacion}
            onBlur={validacion}
          />
          <div className="app-container-icon">{MostrarIcono()}</div>
        </div>
        <div className="app-container-showError">{MostrarError()}</div>
      </div>
    </div>
  );
};

export const StaticInput: React.FC<{
  placeholder: string;
  type: string;
  value: any;
}> = ({ placeholder, type, value }) => {
  return (
    <div className="app-container-input">
      <div className="app-container-input-icon">
        <div className="app-container-input-label">
          <label>{placeholder}</label>
        </div>
        <div className="app-container-inputAndIcon">
          <input type={type} value={value} disabled />
        </div>
      </div>
    </div>
  );
};
