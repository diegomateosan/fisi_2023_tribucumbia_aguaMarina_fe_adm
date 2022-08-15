import React, { Fragment, useEffect, useState } from "react";

import { Category, CreateContent } from "../../components/category/category";
import { NavBar } from "../../components/sideBar/sideBar";
import { HeaderBack, HeaderButton } from "../../components/header/header";
import "./home.css";
import { useNavigate, useLocation } from "react-router-dom";
import { CategoryData, CategoryState } from "../../entities/category";

export const Home: React.FC<{
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
          <HeaderButton
            placeholder="Categorías"
            handleClick={() => navigate("/category/create")}
            nameButton="Crear Categoria"
          />
        </div>
        <div className="app-container-category-content-category">
          <Category />
        </div>
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
          <HeaderBack
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

export const EditCategory: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const [stateProps, setStateProps] = useState<CategoryState>();

  const location = useLocation();
  const { state } = location;

  console.log("location ", location);

  const Mostrar = () => {
    console.log(state);
  };

  return (
    <div className="app-container-edit-category">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <div className="app-container-category-content-header">
          <HeaderBack
            placeholder="Editar categorías"
            handleClick={() => Mostrar()}
          />
        </div>
      </div>
    </div>
  );
};
