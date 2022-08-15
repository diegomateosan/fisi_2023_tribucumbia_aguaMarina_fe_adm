
//Libs
import React, { useEffect,  useState } from "react";
import { storage } from "../../FireBase/firebase";
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 } from "uuid";
//Components
import { NotItem } from "../notItem/notItem";
import { Button } from "../button/button";
import { CategoryCard } from "../dataCard/dataCard";

//Services
import categoryService from "../../services/category";
import dishesService from "../../services/dishes";
import { CategoryData } from "../../entities/category";

//Styles
import "./user.css";
import { Navigate, useNavigate } from "react-router-dom";
import { InputDefault, InputPassword } from "../inputContainer/input";
import { dblClick } from "@testing-library/user-event/dist/click";
import { idText } from "typescript";
import { CreatePlatillo } from "../../pages/platillo/platillo";
import userService from "../../services/user";

export const TablaUsuarios: React.FC<{}> = () => {
  const [existsEntrys, setExistsEntrys] = useState<boolean>(false);

  const navigate = useNavigate();
  const countCategories = async () => {
    // cambiar aqui por user servidces y agregar el count
    const result = await categoryService.count(); 
    setExistsEntrys(result);
    console.log("Usuarios exists state: " + result);
  };

  const handleClick = () => {
    navigate("/user");
  };

  useEffect(() => {
    countCategories();
  }, [existsEntrys]);

  const shownCategories = () => {
    if (!existsEntrys) {
      return (
        <NotItem
          placeholderItem="No existen categorías aún"
          placeholderAdv="para crear una nueva categoría"
          imgSrc="https://drive.google.com/uc?export=view&id=1EMGPkqSn8X0kmFh6jtiSMhqKeDXfamCH"
          altTittle="Not item Logo"
          onSubmit={handleClick}
        />
      );
    } else {
      return (<div></div>            )
    }
  };

  return (
    <div className="app-container-categories">
      {/* <div className="app-container-content">{shownCategories()}</div> */}
    </div>
  );
};

export const CreateUserContent: React.FC<{
  name: string;
  nameState: boolean;
  setNameState: (txt: boolean) => void;
  setName: (txt: string) => void;
  email: string;
  emailState: boolean;
  setemailState: (txt: boolean) => void;
  setemail: (txt: string) => void;
  password : string;
  passwordState: boolean;
  setpassword : (txt:string) => void;
  setpasswordState : (txt: boolean) => void;
  lastname : string;
  lastnameState: boolean;
  setlastname : (txt:string) => void;
  setlastnameState : (txt: boolean) => void;
  idRol : string;
  idRolState: boolean;
  setidRol : (txt:string) => void;
  setidRolState : (txt: boolean) => void;
  dni : string;
  dniState: boolean;
  setdni : (txt:string) => void;
  setdniState : (txt: boolean) => void; 
  phone : string;
  phoneState: boolean;
  setphone : (txt:string) => void;
  setphoneState : (txt: boolean) => void;
  genero : string;
  generoState: boolean;
  setgenero : (txt:string) => void;
  setgeneroeState : (txt: boolean) => void;  



}> = ({
    name,
    nameState,
    setNameState,
    setName,
    email,
    emailState,
    setemailState,
    setemail,
    password ,
    passwordState,
    setpassword,
    setpasswordState,
    idRol,
    idRolState,
    setidRol,
    setidRolState,
    lastname,
    lastnameState,
    setlastname,
    setlastnameState,
    dni,
    dniState,
    setdni,
    setdniState, 
    phone,
    phoneState,
    setphone,
    setphoneState,
    genero,
    generoState,
    setgenero,
    setgeneroeState,  



}) => {
 
  const [buttonState, setbuttonState] = useState(false);
  const navigate = useNavigate();
  const evento = (event: React.ChangeEvent<HTMLSelectElement>) =>{
    if(event.target.value==="Cliente"){
        setidRol("CLI");
        
    }else{
        setidRol("ADM");
    }
    setidRolState(true);
}

const eventoGenero= (event: React.ChangeEvent<HTMLSelectElement>) =>{
    if(event.target.value==="Masculino"){
        setgenero("M");
        
    }else{
        setgenero("F");
    }
    setgeneroeState(true);
}

  const CreateUser= async () => {
 
      if (nameState === true && emailState === true && passwordState === true && idRolState===true && generoState===true  && phoneState===true && dniState===true && idRolState===true ) {

     const result = await  userService.register(name,email,password,idRol,phone,genero,dni,lastname)
  console.log(result);
    console.log(idRol);
      alert("Registro exitoso");
      navigate("/user");
    } else {
      alert("campos vacios");
    }

    }
    
    
    
 

  return (
    <div className="app-container-platillo-create">
      <div className="app-container-platillo-create-form">
        <InputDefault
          estado={nameState}
          campo={name}
          cambiarEstado={(txt: boolean) => setNameState(txt)}
          cambiarCampo={(txt: string) => setName(txt)}
          tipo="text"
          label="Nombre"
          placeholder="Ejemplo: Ceviche Mixto"
          leyendaError="La categoría debe contener como mínimo 6 caracteres"
          expresionRegular={/^.{6,25}$/}
        />

        <InputDefault
          estado={lastnameState}
          campo={lastname}
          cambiarEstado={(txt: boolean) => setlastnameState(txt)}
          cambiarCampo={(txt: string) => setlastname(txt)}
          tipo="text"
          label="Apellido"
          placeholder="Ejemplo: Mayhuay"
          leyendaError="La categoría debe contener como mínimo 6 caracteres"
          expresionRegular={/^.{6,25}$/}
        />

        
        <InputDefault
            estado={phoneState}
            campo={phone}
            cambiarEstado={(txt: boolean) => setphoneState(txt)}
            cambiarCampo={(txt: string) => setphone(txt)}
            tipo="text"
            label="Número de celular"
            placeholder="Debe contener 9 caracteres numéricos"
            leyendaError="Debe contener 9 números"
            expresionRegular={/^\d{9}$/}
          />    
        
        <InputDefault
            estado={dniState}
            campo={dni}
            cambiarEstado={(txt: boolean) => setdniState(txt)}
            cambiarCampo={(txt: string) => setdni(txt)}
            tipo="text"
            label="Número de DNI"
            placeholder="Debe contener 8 caracteres numéricos"
            leyendaError="Debe contener 8 números"
            expresionRegular={/^\d{8}$/}
          />  
        
        
        
        
        <div className="app-container-gender">
            <label>Genero</label>
            <select name="Genero"   onChange={(e : React.ChangeEvent<HTMLSelectElement>)=>eventoGenero(e)}>
            <option selected disabled>
                    Choose one
                   </option>
              <option>Masculino</option> <option>Femenino</option>
            </select>
          </div>
        



        <InputDefault
          estado={emailState}
          campo={email}
          cambiarEstado={(txt: boolean) => setemailState(txt)}
          cambiarCampo={(txt: string) => setemail(txt)}
          tipo="text"
          label="Email"
          placeholder="Ejemplo: zzz@example.com"
          leyendaError="Debe seguir el formato"
          expresionRegular={  /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/}
        />

        <InputPassword
          estado={passwordState}
          campo={password}
          cambiarEstado={(txt: boolean) => setpasswordState(txt)}
          cambiarCampo={(txt: string) => setpassword(txt)}
          label="Password"
          placeholder="Debe contener como minimo 6 "
          leyendaError="La categoría debe contener como mínimo 6 caracteres"
          expresionRegular={/^.{6,25}$/}
        />

        <label>ROL</label>
         <select name="Categoria " onChange={(e : React.ChangeEvent<HTMLSelectElement>)=>evento(e)}>
                   
                   <option selected disabled>
                    Choose one
                   </option>
                <option>Cliente</option>
                <option>Administrador</option>
       
            </select>
    
        <Button placeholder="Registrar" handleClick={CreateUser} />
      </div>
     
          
      

    </div>
  );
};


