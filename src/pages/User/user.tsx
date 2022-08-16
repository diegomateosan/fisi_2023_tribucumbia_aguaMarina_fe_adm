import React, { useEffect, useState } from "react";

import { NavBar } from "../../components/sideBar/sideBar";
import { HeaderBack, HeaderButton } from "../../components/header/header";

import "./user.css";

import { useLocation, useNavigate } from "react-router-dom";
import { CreatePlatilloContent } from "../../components/platilloConten/platillo";
import { CreateUserContent, TablaUsuarios } from "../../components/user/user";
import { UserState } from "../../entities/User";
import userService from "../../services/user";
import { StaticInput } from "../../components/inputContainer/input";
import { Button } from "../../components/button/button";

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
          <HeaderButton
            placeholder="Usuario"
            handleClick={() => navigate("/user/create")}
            nameButton="Crear Usuario"
          />
        </div>
        <div className="app-container-category-content-category">
          <TablaUsuarios />
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
            password={password}
            setpassword={(txt: string) => setpassword(txt)}
            passwordState={passwordState}
            setpasswordState={(txt: boolean) => setpasswordState(txt)}
            idRol={idRol}
            setidRol={(txt: string) => setidRol(txt)}
            idRolState={idRolState}
            setidRolState={(txt: boolean) => setidRolState(txt)}
            lastname={lastname}
            setlastname={(txt: string) => setlastname(txt)}
            lastnameState={lastnameState}
            setlastnameState={(txt: boolean) => setlastnameState(txt)}
            genero={genero}
            setgenero={(txt: string) => setidRol(txt)}
            generoState={generoState}
            setgeneroeState={(txt: boolean) => setgeneroState(txt)}
            dni={dni}
            setdni={(txt: string) => setdni(txt)}
            dniState={dniState}
            setdniState={(txt: boolean) => setdniState(txt)}
            phone={phone}
            setphone={(txt: string) => setphone(txt)}
            phoneState={phoneState}
            setphoneState={(txt: boolean) => setphoneState(txt)}
          />
        </div>
      </div>
    </div>
  );

    



};


export const BorrarUser: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location as UserState;

  const [name, setName] = useState(state.name);
  const [lastname, setDescription] = useState(state.lastname);
  const [dni, setdni] = useState(state.dni);
  const [gender, setgender] = useState(state.gender);
  const [phone_number, setphone_number] = useState(state.phone_number);
  const [email, setemail] = useState(state.email);
  const [id, setid] = useState(state.id);
  const [id_profile, setid_profile] = useState(state.id_profile);
 
  
  const BorrarUsuario = async () => {
    const result = await userService.delete(id);
    console.log(result);
    alert("Usuario Borrado con exito")
    navigate("/user");
  };

  const generoCompleto =()=>{
      if(gender==="F")
     setgender("Femenino");
      else
      setgender("Masculino");
  }

  const RolCompleto =()=>{
    if(id_profile==="ADM")
    setid_profile("Administrador");
    else
    setid_profile("Cliente");
}

useEffect(()=>{
generoCompleto();
RolCompleto();



},[]);


  return (
    <div className="app-container-edit-category">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <div className="app-container-category-content-header">
          <HeaderBack
            placeholder="Eliminar Usuario"
            handleClick={() => navigate("/user")}
          />
          <div className="app-container-category-edit-form">
            <div className="app-container-category-edit-form-input">
              <StaticInput type="text" value={name} placeholder="Nombre" />
              <StaticInput
                type="text"
                value={lastname}
                placeholder="Apellido"
              />
              <StaticInput type="text" value={email} placeholder="Correo" />

              <StaticInput
                type="text"
                value={phone_number}
                placeholder="Numero de Celular"
              />

              <StaticInput
                type="text"
                value={gender}
                placeholder="Género"
              />

              <StaticInput
                type="text"
                value={id_profile }
                placeholder="Rol"
              />

              <Button
                placeholder="Borrar Usuario"
                handleClick={BorrarUsuario}
              />
            </div>
          </div>
         
        </div>
      </div>
    </div>
  );
  };
