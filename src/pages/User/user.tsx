import React, { useState } from "react";

import { NavBar } from "../../components/sideBar/sideBar";
import { HeaderBack ,HeaderButton } from "../../components/header/header";


import "./user.css";

import { useNavigate } from "react-router-dom";
import { CreatePlatilloContent } from "../../components/platilloConten/platillo";
import { CreateUserContent } from "../../components/user/user";


export const User: React.FC<{
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
            <HeaderButton placeholder="Usuario" handleClick={()=>navigate("/user/create")} nameButton="Crear Usuario"/>
          </div>
          <div className="app-container-category-content-category">
                  {/* Cards  Usuario */}
          </div>
          
        </div>
  
      </div>
    );
  };


  
  export const CreateUser: React.FC<{
    handleauth: () => void;
  }> = ({ handleauth }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [nameState, setNameState] = useState(false);
    const [email, setemail] = useState("");
    const [emailState, setemailState] = useState(false);
    const [password, setpassword] = useState("");
    const [passwordState, setpasswordState] = useState(false);
    const [idRol, setidRol] = useState("");
    const [idRolState, setidRolState] = useState(false);
    const [lastname, setlastname] = useState("");
    const [lastnameState, setlastnameState] = useState(false);
    const [phone, setphone] = useState("");
    const [phoneState, setphoneState] = useState(false);
    const [dni, setdni] = useState("");
    const [dniState, setdniState] = useState(false);
    const [genero, setgenero] = useState("");
    const [generoState, setgeneroState] = useState(false);
    return (
      <div className="app-container-home">
        <div className="app-container-navBar">
          <NavBar handleauth={handleauth} />
        </div>
  
        <div className="app-container-category-content">
          <div className="app-container-category-content-header">
            <HeaderBack
              placeholder="Crear Usuarios"
              handleClick={() => navigate("/user")}
            />
  
             <CreateUserContent
              name={name}
              setName={(txt: string) => setName(txt)}
              nameState={nameState}
              setNameState={(txt: boolean) => setNameState(txt)}
              email={email}
              setemail={(txt: string) => setemail(txt)}
              emailState={emailState}
              setemailState={(txt: boolean) => setemailState(txt)}
              password = {password}
              setpassword = {(txt: string) => setpassword(txt)}
              passwordState = {passwordState}
              setpasswordState = {(txt: boolean) => setpasswordState(txt)}
              idRol = {idRol}
              setidRol = {(txt: string) => setidRol(txt)}
              idRolState = {idRolState}
              setidRolState = {(txt: boolean) => setidRolState(txt)}
              lastname = {lastname}
              setlastname = {(txt: string) => setlastname(txt)}
              lastnameState = {lastnameState}
              setlastnameState = {(txt: boolean) => setlastnameState(txt)}  
              genero = {genero}
              setgenero = {(txt: string) => setidRol(txt)}
              generoState = {generoState}
              setgeneroeState = {(txt: boolean) => setgeneroState(txt)}  
              dni = {dni}
              setdni = {(txt: string) => setdni(txt)}
              dniState = {dniState}
              setdniState = {(txt: boolean) => setdniState(txt)} 
              phone = {phone}
              setphone = {(txt: string) => setphone(txt)}
              phoneState = {phoneState}
              setphoneState = {(txt: boolean) => setphoneState(txt)} 

            /> 
          </div>
        </div>
      </div>
    );
        }