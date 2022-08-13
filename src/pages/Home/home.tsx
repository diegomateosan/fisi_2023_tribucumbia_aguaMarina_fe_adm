import React, { useState } from "react";

import { Category, CreateContent } from "../../components/category/category";
import { NavBar } from "../../components/sideBar/sideBar";
import { Header, HeaderDefault } from "../../components/header/header";
import "./home.css";
import { useNavigate } from "react-router-dom";

export const Home: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  return (
    <div className="app-container-home">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <div className="app-container-category-content-header">
          <HeaderDefault placeholder="Categorías" />
        </div>
        <Category />
      </div>
    </div>
  );
};

export const CreateCategory: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nameState, setNameState] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionState, setDescriptionState] = useState(false);

  return (
    <div className="app-container-home">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <div className="app-container-category-content-header">
          <Header
            placeholder="Crear categorías"
            handleClick={() => navigate("/category")}
          />

          <CreateContent
            name={name}
            setName={(txt: string) => setName(txt)}
            nameState={nameState}
            setNameState={(txt: boolean) => setNameState(txt)}
            description={description}
            setDescription={(txt: string) => setDescription(txt)}
            descriptionState={descriptionState}
            setDescriptionState={(txt: boolean) => setDescriptionState(txt)}
          />
        </div>
      </div>
    </div>
  );
};
