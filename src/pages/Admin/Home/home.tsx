import React from "react";

import { Category } from "../../../components/category/category";
import { NavBar } from "../../../components/sideBar/sideBar";

import "./home.css";

export const Home: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  return (
    <div className="app-container-home">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <Category />
      </div>
    </div>
  );
};
