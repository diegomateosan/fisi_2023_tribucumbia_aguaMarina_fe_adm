import React, { useState } from "react";

import { NavBar } from "../../components/sideBar/sideBar";
import { HeaderBack ,HeaderButton } from "../../components/header/header";


import "./platillo.css";

import { useNavigate } from "react-router-dom";
import { CreatePlatilloContent, PLatilloListaLlamada } from "../../components/platilloConten/platillo";


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
            <PLatilloListaLlamada/>
          </div>
          
        </div>
  
      </div>
    );
  };


  export const CreatePlatillo: React.FC<{
    handleauth: () => void;
  }> = ({ handleauth }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [nameState, setNameState] = useState(false);
    const [description, setDescription] = useState("");
    const [descriptionState, setDescriptionState] = useState(false);
    const [precio, setprecio] = useState("");
    const [precioState, setprecioState] = useState(false);
    const [id_categoria, setid_categoria] = useState("");
    const [id_categoriaState, setid_categoriaState] = useState(false);
   

    return (
      <div className="app-container-home">
        <div className="app-container-navBar">
          <NavBar handleauth={handleauth} />
        </div>
  
        <div className="app-container-category-content">
          <div className="app-container-category-content-header">
            <HeaderBack
              placeholder="Crear Platillos"
              handleClick={() => navigate("/platillo")}
            />
  
             <CreatePlatilloContent
              name={name}
              setName={(txt: string) => setName(txt)}
              nameState={nameState}
              setNameState={(txt: boolean) => setNameState(txt)}
              description={description}
              setDescription={(txt: string) => setDescription(txt)}
              descriptionState={descriptionState}
              setDescriptionState={(txt: boolean) => setDescriptionState(txt)}
              precio = {precio}
              setprecio = {(txt: string) => setprecio(txt)}
              precioState = {precioState}
              setprecioState = {(txt: boolean) => setprecioState(txt)}
              id_categoria = {id_categoria}
              setid_categoria = {(txt: string) => setid_categoria(txt)}
              id_categoriaState = {id_categoriaState}
              setid_categoriaState = {(txt: boolean) => setid_categoriaState(txt)}
            
            /> 
          </div>
        </div>
      </div>
    );
        }