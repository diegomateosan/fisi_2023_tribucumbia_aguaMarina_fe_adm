import React from "react";
import "./header.css";

import { Button } from "../button/button";

import { BsChevronLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export const HeaderBack: React.FC<{
  placeholder: string;
  handleClick: () => void;
}> = ({ placeholder, handleClick }) => {
  return (
   
      <div className="app-container-headerback">
        <div className="app-container-header-icon">
          <BsChevronLeft size={30} onClick={() => handleClick()} />
        </div>
        <div className="app-container-title">
          <h2>{placeholder}</h2>
        </div>
      </div>
  );
};


export const HeaderDefault: React.FC<{
  placeholder: string;
  handleClick: () => void;
}> = ({ placeholder}) => {
  return (
   
      <div className="app-container-headerback">
        <div className="app-container-title">
          <h2>{placeholder}</h2>
        </div>
      </div>
  );
};



export const HeaderButton: React.FC<{
  placeholder: string;
  nameButton: string;
  handleClick: () => void;
}> = ({ placeholder,handleClick ,nameButton}) => {


  return (

      <div className="app-container-headerButton">
        <div className="app-container-header-default-title-button">
          <div className="app-container-header-default-title">
            <h2>{placeholder}</h2>
          </div>
          
          <div className="app-container-header-default-button">
            <Button
              placeholder={nameButton}
              handleClick= {handleClick}
            />
          </div>
        </div>

      </div>
     
  );
};
