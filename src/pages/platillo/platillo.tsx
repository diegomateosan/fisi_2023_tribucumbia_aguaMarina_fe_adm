import React from "react";

import { NavBar } from "../../components/sideBar/sideBar";
import { HeaderBack ,HeaderButton } from "../../components/header/header";


import "./platillo.css";

import { useNavigate } from "react-router-dom";


export const Platillo: React.FC<{
    handleauth: () => void;
  }> = ({ handleauth }) => {

   const navigate = useNavigate(); 
    return (
      <div className="app-container-home">
        <div className="app-container-navBar">
          <NavBar handleauth={handleauth} />
        </div>
  
        <div className="app-container-category-content">
          <div className="app-container-category-content-header">
            <HeaderButton placeholder="Platillo" handleClick={()=>navigate("/platillo/create")} nameButton="Crear Platillo"/>
          </div>
          <div className="app-container-category-content-category">
            {/* categoriasPlatillos  */}
          </div>
          
        </div>
  
      </div>
    );
  };


  