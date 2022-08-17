import React, { useEffect, useState } from "react";

import categoryService from "../../services/category";
import { CategoryData } from "../../entities/category";
import {
  ButtonDetalle,
  ButtonEliminar,
  ButtonModificar,
} from "../button/button";
import "./dataCard.css";
import { useNavigate } from "react-router-dom";
import { DishesDefault } from "../../entities/dishes";
import dishesService from "../../services/dishes";
import { MostrarPlatillo } from "../../pages/platillo/platillo";

export const CategoryCard: React.FC<{}> = () => {
  const [categoryList, setCategoryList] = useState<CategoryData[] | null>([]);
  const navigate = useNavigate();

  useEffect(() => {
    serviceCategory();
  }, []);

  const serviceCategory = async () => {
    const result = await categoryService.list();
    setCategoryList(result);
    console.log(categoryList);
  };

  const editCategory = async (category: CategoryData) => {
    navigate("/category/edit", {
      state: {
        id: category.id,
        name: category.name,
        description: category.description,
        image_url: category.image_url,
      },
    });
  };

  const DeleteCategory = async (category: CategoryData) => {
    navigate("/category/delete", {
      state: {
        id: category.id,
        name: category.name,
        description: category.description,
        image_url: category.image_url,
      },
    });
  };

  return (
    <div className="dataCard">
      {categoryList?.map((data, idx) => (
        <div className="app-container-category-data-card" key={idx}>
          
          <div className="app-container-category-data-card-img" key={idx}>
            <img src={data.image_url} alt="zzz" />
          </div>

          <div className="app-container-category-data-card-name">
            <li className="app-container-category-data-card-name-li">
              <div className="left">Nombre:</div>
              <div className="right">{data.name}</div>
            </li>
          </div>
          
          <div className="app-container-category-data-card-buttons">
            <ButtonModificar
              placeholder="Editar"
              handleClick={() => editCategory(data)}
            />
            <ButtonEliminar
              placeholder="Eliminar"
              handleClick={() => DeleteCategory(data)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export const PlatilloCard: React.FC<{}> = () => {
  const [platilloList, setplatilloList] = useState<DishesDefault[] | null>([]);
  const navigate = useNavigate();

  useEffect(() => {
    servicePLatillo();
  }, []);

  const servicePLatillo = async () => {
    const result = await dishesService.list();
    setplatilloList(result);
    console.log(platilloList);
  };

  const editPlatillo = async (platillo: DishesDefault) => {
    navigate("/platillo/edit", {
      state: {
        id: platillo.id,
        nombre: platillo.nombre,
        descripcion: platillo.descripcion,
        imagen: platillo.imagen,
        precio: platillo.precio,
        id_categoria: platillo.id_categoria,
        id_oferta: platillo.id_oferta,
      },
    });
  };

  const mostrarPlatillo = async (platillo: DishesDefault) => {
    navigate("/platillo/show", {
      state: {
        id: platillo.id,
        nombre: platillo.nombre,
        descripcion: platillo.descripcion,
        imagen: platillo.imagen,
        precio: platillo.precio,
        id_categoria: platillo.id_categoria,
        id_oferta: platillo.id_oferta,
      },
    });
  };



  const DeletePlatillo = async (platillo: DishesDefault) => {
    navigate("/platillo/delete", {
      state: {
        id: platillo.id,
        nombre: platillo.nombre,
        descripcion: platillo.descripcion,
        imagen: platillo.imagen,
        precio: platillo.precio,
        id_categoria: platillo.id_categoria,
        id_oferta: platillo.id_oferta,
      },
    });
  };

  return (
    <div className="dataCard">
      {platilloList?.map((data, idx) => (
        <div className="app-container-category-data-card" key={idx}>
          <div className="app-container-category-data-card-img" key={idx}>
            <img src={data.imagen} alt="Imagen no Encontrada" />
          </div>
          <div className="app-container-category-data-card-name">
            <li className="app-container-category-data-card-name-li">
              <div className="left">Nombre:</div>
              <div className="right">{data.nombre}</div>
            </li>
            <li className="app-container-category-data-card-name-li">
              <div className="left">Precio:</div>
              <div className="right">{data.precio}</div>
            </li>
          </div>

          <div className="app-container-category-data-card-buttons">
            <ButtonModificar
              placeholder="Editar"
              handleClick={() => editPlatillo(data)}
            />
            <ButtonDetalle
              placeholder="Detalle"
              handleClick={() => mostrarPlatillo(data)}
            />

            <ButtonEliminar
              placeholder="Eliminar"
              handleClick={() => DeletePlatillo(data)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
