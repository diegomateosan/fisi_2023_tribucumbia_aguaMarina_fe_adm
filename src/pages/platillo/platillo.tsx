import React, { useEffect, useState } from "react";

import { NavBar } from "../../components/sideBar/sideBar";
import { HeaderBack, HeaderButton } from "../../components/header/header";

import "./platillo.css";

import { useLocation, useNavigate } from "react-router-dom";
import {
  CreatePlatilloContent,
  PLatilloListaLlamada,
} from "../../components/platilloConten/platillo";
import { DishesState } from "../../entities/dishes";
import {
  InputDefault,
  StaticInput,
} from "../../components/inputContainer/input";

import { storage } from "../../FireBase/firebase";
import {
  ref,
  uploadBytes,
  getStorage,
  getDownloadURL,
  StorageReference,
} from "firebase/storage";
import { v4 } from "uuid";
import { Button } from "../../components/button/button";
import categoryService from "../../services/category";
import { CategoryData } from "../../entities/category";
import dishesService from "../../services/dishes";

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
          <HeaderButton
            placeholder="Platillo"
            handleClick={() => navigate("/platillo/create")}
            nameButton="Crear Platillo"
          />
        </div>
        <div className="app-container-category-content-category">
          <PLatilloListaLlamada />
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
  const [id_categoria, setid_categoria] = useState(0);
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
            precio={precio}
            setprecio={(txt: string) => setprecio(txt)}
            precioState={precioState}
            setprecioState={(txt: boolean) => setprecioState(txt)}
            id_categoria={id_categoria}
            setid_categoria={(txt: number) => setid_categoria(txt)}
            id_categoriaState={id_categoriaState}
            setid_categoriaState={(txt: boolean) => setid_categoriaState(txt)}
          />
        </div>
      </div>
    </div>
  );
};

export const EditPlatillo: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location as DishesState;
  const [name, setName] = useState(state.nombre);
  const [nameState, setNameState] = useState(true);
  const [description, setDescription] = useState(state.descripcion);
  const [descriptionState, setDescriptionState] = useState(true);
  const [precio, setprecio] = useState(state.precio);
  const [precioState, setprecioState] = useState(true);
  const [id_categoria, setid_categoria] = useState(state.id_categoria);
  const [id_categoriaState, setid_categoriaState] = useState(true);
  const [categoria, setCategoria] = useState<string>("");
  const [id, setId] = useState(state.id);
  const [categoryList, setCategoryList] = useState<CategoryData[] | null>([]);

  const [imageUrl, setimageUrl] = useState(state.imagen);
  const [urlState, setUrlState] = useState(true);

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [buttonState, setbuttonState] = useState(true);

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImageUpload(file);
  };

  const llamarCategorias = async () => {
    const result = await categoryService.list();
    setCategoryList(result);
  };

  useEffect(() => {
    if (imageUpload !== undefined) {
      setbuttonState(true);
      console.log(buttonState);
    } else {
      setbuttonState(false);
      console.log(buttonState);
      setUrlState(false);
    }
    categoriaID(categoria);
    console.log(imageUpload);
  }, [imageUpload,categoria]);

  useEffect(() => {
    llamarCategorias();
    obtenerNombre();
  }, []);

  const obtenerNombre = async () => {
    const responseResult = await categoryService.getName(id_categoria);
    setCategoria(responseResult.data.name);
  };

  const categoriaID = async (name: string) => {
    if(categoria!==""){
      const result = await categoryService.showID(name);
     console.log(result.data.id); 
    setid_categoria(result.data.id);
      setid_categoriaState(true)
 
    }
     };

  const evento = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(event.target.value);
  };

  const mapearCategorias = () => {
    if (categoryList !== null) {
      return (
        <select
          name="Categoria "
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => evento(e)}
          value={categoria}
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

  const EditarPlatillo = async () => {

      if (
        nameState === true &&
        descriptionState === true &&
        urlState === true &&
        precioState === true &&
        id_categoriaState === true
      ) {
        const result = await dishesService.edit(
          name,
          description,
          imageUrl,
          Number(precio),
          Number(id_categoria),
          Number(id)
        );
        console.log(result);
        navigate("/platillo")
        alert("Platillo editado");
      }

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
            handleClick={() => navigate("/platillo")}
          />
          <div className="app-container-category-edit-form">
            <div className="app-container-category-edit-form-input">
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

              <InputDefault
                estado={precioState}
                campo={precio}
                cambiarEstado={(txt: boolean) => setprecioState(txt)}
                cambiarCampo={(txt: any) => setprecio(txt)}
                tipo="number"
                label="Precío"
                placeholder="Ejemplo: 20.00 "
                leyendaError="La categoría debe contener como mínimo 6 caracteres"
                expresionRegular={/[0-9]+[.]([1-9][0-9]|[0][0])$/}
              />

              {mapearCategorias()}

              <div className="app-container-category-edit-file">
                <label>Imagen</label>
                <input
                  type="file"
                  onChange={(event) => handleOnChange(event)}
                />
                <button onClick={uploadImage}>Upload Image</button>

                {buttonState ? (
                  <Button
                    placeholder="Editar Categoría"
                    handleClick={EditarPlatillo}
                  />
                ) : (
                  <div></div>
                )}
              </div>
            </div>

            <div className="app-container-category-create-image">
              {mostrarImagen()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const MostrarPlatillo: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location as DishesState;
  const [name, setName] = useState(state.nombre);
  const [nameState, setNameState] = useState(true);
  const [description, setDescription] = useState(state.descripcion);
  const [descriptionState, setDescriptionState] = useState(true);
  const [precio, setprecio] = useState(state.precio);
  const [precioState, setprecioState] = useState(true);
  const [id_categoria, setid_categoria] = useState(state.id_categoria);
  const [id_categoriaState, setid_categoriaState] = useState(true);
  const [categoria, setCategoria] = useState<string>("");
  const [id, setId] = useState(state.id);
  const [categoryList, setCategoryList] = useState<CategoryData[] | null>([]);

  const [imageUrl, setimageUrl] = useState(state.imagen);
  const [urlState, setUrlState] = useState(true);

  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [buttonState, setbuttonState] = useState(true);

  const handleOnChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    setImageUpload(file);
  };

  const llamarCategorias = async () => {
    const result = await categoryService.list();
    setCategoryList(result);
  };

  useEffect(() => {
    if (imageUpload !== undefined) {
      setbuttonState(true);
      console.log(buttonState);
    } else {
      setbuttonState(false);
      console.log(buttonState);
      setUrlState(false);
    }
    categoriaID(categoria);
    console.log(imageUpload);
  }, [imageUpload,categoria]);

  useEffect(() => {
    llamarCategorias();
    obtenerNombre();
  }, []);

  const obtenerNombre = async () => {
    const responseResult = await categoryService.getName(id_categoria);
    setCategoria(responseResult.data.name);
  };

  const categoriaID = async (name: string) => {
    if(categoria!==""){
      const result = await categoryService.showID(name);
     console.log(result.data.id); 
    setid_categoria(result.data.id);
      setid_categoriaState(true)
 
    }
     };

  const evento = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoria(event.target.value);
  };

  const mapearCategorias = () => {
    if (categoryList !== null) {
      return (
        <select
          name="Categoria "
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => evento(e)}
          value={categoria}
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

  const EditarPlatillo = async () => {

      if (
        nameState === true &&
        descriptionState === true &&
        urlState === true &&
        precioState === true &&
        id_categoriaState === true
      ) {
        const result = await dishesService.edit(
          name,
          description,
          imageUrl,
          Number(precio),
          Number(id_categoria),
          Number(id)
        );
        console.log(result);
        navigate("/platillo")
        alert("Platillo editado");
      }

  };

  return (
    <div className="app-container-edit-category">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <div className="app-container-category-content-header">
          <HeaderBack
            placeholder="Detalle platillo"
            handleClick={() => navigate("/platillo")}
          />
          <div className="app-container-category-edit-form">
             <label>Id del platillo:</label>
              <label> {id}</label>
              <br></br>          
              <label>Nombre:</label>
              <label>{name}</label>
              <br></br>
              <label>Descripción:</label>
              <label>{description}</label>
              <br></br>
              <label>Precio</label>
              <label>{precio}</label>
              <br></br>
              <label>Id de categoria:</label>
              <label>{id_categoria}</label>
              <br></br>
              <label>Nombre de categoria:</label>
              <label>{categoria}</label>
              <br></br>
              

            <div className="app-container-category-create-image">
              {mostrarImagen()}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};



export const BorrarPlatillo: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const navigate = useNavigate();

  const location = useLocation();
  const { state } = location as DishesState;

  const [name, setName] = useState(state.nombre);
  const [description, setDescription] = useState(state.descripcion);
  const [precio, setprecio] = useState(state.precio);
  const [id_categoria, setid_categoria] = useState(state.id_categoria);
  const [categoria, setCategoria] = useState<string>("");
  const [id, setId] = useState(state.id);
  const [categoryList, setCategoryList] = useState<CategoryData[] | null>([]);
  const [imageUrl, setimageUrl] = useState(state.imagen);

  const mostrarImagen = () => {
    return (
      <div className="app-container-create-image-uploaded">
        <label>Previsualización de la Imagen </label>
        <img src={imageUrl} alt="image just uploaded" />
      </div>
    );
  };

  const BorrarPlatillo = async () => {
    const result = await dishesService.delete(id);
    console.log(result);
  };

  return (
    <div className="app-container-edit-category">
      <div className="app-container-navBar">
        <NavBar handleauth={handleauth} />
      </div>

      <div className="app-container-category-content">
        <div className="app-container-category-content-header">
          <HeaderBack
            placeholder="Eliminar categorías"
            handleClick={() => navigate("/category")}
          />
          <div className="app-container-category-edit-form">
            <div className="app-container-category-edit-form-input">
              <StaticInput type="text" value={id} placeholder="id" />
              <StaticInput type="text" value={name} placeholder="Nombre" />
              <StaticInput
                type="text"
                value={description}
                placeholder="Descripción"
              />
              <StaticInput type="number" value={precio} placeholder="Precio" />

              <StaticInput
                type="number"
                value={id_categoria}
                placeholder="Categoria"
              />

              <Button
                placeholder="Borrar categoría"
                handleClick={BorrarPlatillo}
              />
            </div>
          </div>
          <div className="app-container-category-create-image">
            {mostrarImagen()}
          </div>
        </div>
      </div>
    </div>
  );

  
};




