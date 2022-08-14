//Libs
import React, { useEffect, useState } from "react";
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

//Services
import categoryService from "../../services/category";

//Styles
import "./category.css";
import { Navigate, useNavigate } from "react-router-dom";
import { InputDefault } from "../inputContainer/input";

export const Category: React.FC<{}> = () => {
  const [existsEntrys, setExistsEntrys] = useState<boolean>(false);
  const navigate = useNavigate();
  const countCategories = async () => {
    const result = await categoryService.count();
    setExistsEntrys(result);
    console.log("Categories exists state: " + result);
  };

  const handleClick = () => {
    navigate("/category/create");
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
      console.log("Si hay categorias");
    }

    return <div className="app-container-state"></div>;
  };

  return (
    <div className="app-container-categories">
      <div className="app-container-content">{shownCategories()}</div>
    </div>
  );
};

export const CreateContent: React.FC<{
  name: string;
  nameState: boolean;
  setNameState: (txt: boolean) => void;
  setName: (txt: string) => void;
  description: string;
  descriptionState: boolean;
  setDescriptionState: (txt: boolean) => void;
  setDescription: (txt: string) => void;
}> = ({
  name,
  nameState,
  setName,
  setNameState,
  description,
  descriptionState,
  setDescription,
  setDescriptionState,
}) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setimageUrl] = useState("");
  const [urlState, setUrlState] = useState(false);
  const [buttonState, setbuttonState] = useState(false);
  const navigate = useNavigate();

  const mostrarImagen = () => {
    if (urlState === true) {
      return (
        <div className="app-container-create-image-uploaded">
          <label>Previsualización de la Imagen </label>
          <img src={imageUrl} alt="image just uploaded" />
        </div>
      );
    }
  };


  useEffect ( ( )=>{
    if(imageUpload!==undefined && imageUpload!==null ){

       setbuttonState(true);
       console.log(buttonState);
    }else{
      setbuttonState(false);
       console.log(buttonState);
      setUrlState(false);
      }
    console.log(imageUpload);
  },[imageUpload] );



  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImageUpload(file);
  };

  const uploadImage = async () => {
    if (imageUpload === null || imageUpload===undefined) {
      alert("No se seleccionó ningún archivo");
      return <div></div>;
    }else{
      const imageRef = await ref(storage, `category/${imageUpload.name + v4()}`);
      await uploadBytes(imageRef, imageUpload).then(() => {
        console.log("llego");
      });
  
      getDownloadURL(ref(storage, `category/${imageRef.name}`)).then((url) => {
        console.log(url);
        setimageUrl(url);
        setUrlState(true);
  
  
      });
  
      setUrlState(true);      
    }

  };

  const createCategory = async () => {
      if(nameState===true && descriptionState ===true && urlState===true){
        const result = await categoryService.create(name, description, imageUrl);
        console.log(result);
        alert("Registro exitoso");
        navigate("/category");

      }else{
        alert("campos vacios");
      }

    
  };

  return (
    <div className="app-container-category-create">
      <div className="app-container-category-create-form">
        <InputDefault
          estado={nameState}
          campo={name}
          cambiarEstado={(txt: boolean) => setNameState(txt)}
          cambiarCampo={(txt: string) => setName(txt)}
          tipo="text"
          label="Nombre"
          placeholder="Ejemplo: Entradas"
          leyendaError="La categoría debe contener como mínimo 6 caracteres"
          expresionRegular={/^.{6,25}$/}
        />

        <InputDefault
          estado={descriptionState}
          campo={description}
          cambiarEstado={(txt: boolean) => setDescriptionState(txt)}
          cambiarCampo={(txt: string) => setDescription(txt)}
          tipo="text"
          label="Descripción"
          placeholder="Ejemplo: zzz"
          leyendaError="La categoría debe contener como mínimo 6 caracteres"
          expresionRegular={/^.{6,25}$/}
        />
        <div className="app-container-category-create-file">
          <label>Imagen</label>
          <input type="file" onChange={(event) => handleOnChange(event)} />
          <button onClick={uploadImage}>Upload Image</button>
          {buttonState?(
            <Button placeholder="Registrar" handleClick={createCategory} />
            ):  (

            <div></div>

           )    }
          
        </div>
      </div>
      <div className="app-container-category-create-image">
        {mostrarImagen()}
      </div>

    </div>
  );
};
