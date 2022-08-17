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
import { CategoryCard, PlatilloCard } from "../dataCard/dataCard";

//Services
import categoryService from "../../services/category";
import dishesService from "../../services/dishes";
import { CategoryData } from "../../entities/category";

//Styles
import "./platillo.css";
import { Navigate, useNavigate } from "react-router-dom";
import { InputDefault } from "../inputContainer/input";
import { dblClick } from "@testing-library/user-event/dist/click";
import { idText } from "typescript";
import { CreatePlatillo } from "../../pages/platillo/platillo";

export const PLatilloListaLlamada: React.FC<{}> = () => {
  const [existsEntrys, setExistsEntrys] = useState<boolean>(false);

  const navigate = useNavigate();
  const countCategories = async () => {
    // cambiar aqui por dishes servidces
    const result = await categoryService.count();
    setExistsEntrys(result);
    console.log("Categories exists state: " + result);
  };

  const handleClick = () => {
    navigate("/platillo/create");
  };

  useEffect(() => {
    countCategories();
  }, [existsEntrys]);

  const shownCategories = () => {
    if (!existsEntrys) {
      return (
        <NotItem
          placeholderItem="No existen platillos aún"
          placeholderAdv="para crear un nuevo platillo"
          imgSrc="https://drive.google.com/uc?export=view&id=1EMGPkqSn8X0kmFh6jtiSMhqKeDXfamCH"
          altTittle="Not item Logo"
          onSubmit={handleClick}
        />
      );
    } else {
      return <PlatilloCard />;
    }
  };

  return (
    <div className="app-container-categories">
      <div className="app-container-content">{shownCategories()}</div>
    </div>
  );
};

export const CreatePlatilloContent: React.FC<{
  name: string;
  nameState: boolean;
  setNameState: (txt: boolean) => void;
  setName: (txt: string) => void;
  description: string;
  descriptionState: boolean;
  setDescriptionState: (txt: boolean) => void;
  setDescription: (txt: string) => void;
  precio: string;
  precioState: boolean;
  setprecio: (txt: string) => void;
  setprecioState: (txt: boolean) => void;
  id_categoria: number;
  id_categoriaState: boolean;
  setid_categoria: (txt: number) => void;
  setid_categoriaState: (txt: boolean) => void;
}> = ({
  name,
  nameState,
  setNameState,
  setName,
  description,
  descriptionState,
  setDescriptionState,
  setDescription,
  precio,
  precioState,
  setprecio,
  setprecioState,
  id_categoria,
  id_categoriaState,
  setid_categoria,
  setid_categoriaState,
}) => {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageUrl, setimageUrl] = useState("");
  const [urlState, setUrlState] = useState(false);
  const [buttonState, setbuttonState] = useState(false);
  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState<CategoryData[] | null>([]);
  const [nombrecategory, setnombrecategory] = useState("");

  const mostrarImagen = () => {
    if (urlState === true) {
      return (
        <div className="app-container-platillo-image-uploaded">
          <label>Previsualización de la Imagen </label>
          <img src={imageUrl} alt="image just uploaded" />
        </div>
      );
    }
  };

  const llamarCategorias = async () => {
    const result = await categoryService.list();
    setCategoryList(result);
  };

  const categoriaID = async (name: string) => {
    if(nombrecategory!==""){
      const result = await categoryService.showID(name);
     console.log(result.data.id); 
    setid_categoria(result.data.id);
      setid_categoriaState(true)
 
    }
     };

  const evento = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setnombrecategory(event.target.value);
  };

  const mapearCategorias = () => {
    if (categoryList !== null) {
      return (
        <select
          name="Categoria "
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => evento(e)}
        >
          <option selected disabled>
            Choose one
          </option>

          {categoryList?.map((data, idx) => (
            <option key={idx}>{data.name} </option>
          ))}
        </select>
      );
    } else {
      return (
        <select name="Categoria ">
          <option>No hay categorias </option>
        </select>
      );
    }
  };

  useEffect(() => {
    llamarCategorias();
    categoriaID(nombrecategory);
    if (imageUpload !== undefined && imageUpload !== null) {
      setbuttonState(true);
      console.log(buttonState);
    } else {
      setbuttonState(false);
      console.log(buttonState);
      setUrlState(false);
    }
    console.log(imageUpload);
  }, [imageUpload,nombrecategory]);

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImageUpload(file);
  };

  const uploadImage = async () => {
    if (imageUpload === null || imageUpload === undefined) {
      alert("No se seleccionó ningún archivo");
      return <div></div>;
    } else {
      const imageRef = await ref(
        storage,
        `platillo/${imageUpload.name + v4()}`
      );
      await uploadBytes(imageRef, imageUpload).then(() => {
        console.log("llego");
      });

      getDownloadURL(ref(storage, `platillo/${imageRef.name}`)).then((url) => {
        console.log(url);
        setimageUrl(url);
        setUrlState(true);
      });

      setUrlState(true);
    }
  };

  const CreatePlatillo = async () => {

      if (
        nameState === true &&
        descriptionState === true &&
        urlState === true &&
        precioState === true &&
        id_categoriaState === true 
      ) {
        // mandar los datos del platillo  ojo no olvides los tipos

        const result = await dishesService.create(
          name,
          description,
          imageUrl,
          Number(precio),
          Number(id_categoria)
        );
        console.log(result);
        alert("Registro exitoso");
        navigate("/platillo");
      } else {
        alert("campos vacios");
      }
    
  };

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

        <InputDefault
          estado={precioState}
          campo={precio}
          cambiarEstado={(txt: boolean) => setprecioState(txt)}
          cambiarCampo={(txt: string) => setprecio(txt)}
          tipo="text"
          label="Precío"
          placeholder="Ejemplo: 20.00 "
          leyendaError="La categoría debe contener como mínimo 6 caracteres"
          expresionRegular={/[0-9]+[.]([1-9][0-9]|[0][0])$/}
        />

        <div className="app-container-platillo-create-category">
          <label>Categorias</label>
          {mapearCategorias()}
        </div>

        <div className="app-container-platillo-create-file">
          <label>Imagen</label>
          <input type="file" onChange={(event) => handleOnChange(event)} />
          <button onClick={uploadImage}>Upload Image</button>
          {buttonState ? (
            <Button placeholder="Registrar" handleClick={CreatePlatillo} />
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="app-container-platillo-create-image">
        {mostrarImagen()}
      </div>
    </div>
  );
};
