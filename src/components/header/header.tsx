import React from "react";
import "./header.css";

import { Button } from "../button/button";

import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const Header: React.FC<{
  placeholder: string;
  handleClick: () => void;
}> = ({ placeholder, handleClick }) => {
  return (
    <div className="app-container-full">
      <div className="app-container-header">
        <div className="app-container-header-icon">
          <BsChevronLeft size={30} onClick={() => handleClick()} />
        </div>

        <div className="app-container-title">
          <h2>{placeholder}</h2>
        </div>
      </div>

      <div className="app-container-header-default-hr">
        <hr />
      </div>
    </div>
  );
};

export const HeaderDefault: React.FC<{
  placeholder: string;
}> = ({ placeholder }) => {
  const navigate = useNavigate();

  return (
    <div className="app-container-full">
      <div className="app-container-header">
        <div className="app-container-header-default-title">
          <h2>{placeholder}</h2>
          <div className="app-container-header-default-title-button">
            <Button
              placeholder="Crear categoría"
              handleClick={() => navigate("/category/create")}
            />
          </div>
        </div>
      </div>
      <div className="app-container-header-default-hr">
        <hr />
      </div>
    </div>
  );
};
