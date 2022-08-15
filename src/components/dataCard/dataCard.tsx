import React, { useEffect, useState } from "react";

import categoryService from "../../services/category";
import { CategoryData } from "../../entities/category";
import { ButtonDetalle, ButtonEliminar, ButtonModificar } from "../button/button";
import "./dataCard.css";
import { useNavigate } from "react-router-dom";
import { DishesDefault } from "../../entities/dishes";
import dishesService from "../../services/dishes";

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

  return (
    <div className='dataCard'>
      {categoryList?.map((data, idx) => (
        <div className="app-container-category-data-card" key={idx}>
          <div className="app-container-category-data-card-img" key={idx}>
            <img src={data.image_url} alt="zzz" />
          </div>
          <div className="app-container-category-data-card-name">
            <h2>{data.name}</h2>
          </div>
          <div className="app-container-category-data-card-buttons">
            <ButtonModificar
              placeholder="Editar"
              handleClick={() => editCategory(data)}
            />
            <ButtonEliminar
              placeholder="Eliminar"
              handleClick={() => alert("hola")}
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
    const result = await  dishesService.list();
    setplatilloList(result);
    console.log(platilloList);
  };

  // const editCategory = async (category: CategoryData) => {
  //   navigate("/platillo/edit", {
  //     state: {
  //       id: category.id,
  //       name: category.name,
  //       description: category.description,
  //       image_url: category.image_url,
  //     },
  //   });
  // };

  return (
    <div className='dataCard'>
      {platilloList?.map((data, idx) => (
        <div className="app-container-category-data-card" key={idx}>
          <div className="app-container-category-data-card-img" key={idx}>
            <img src={data.imagen} alt="Imagen no Encontrada" />
          </div>
          <div className="app-container-category-data-card-name">
            <h2>{data.nombre}</h2>
          </div>
          <div className="app-container-category-data-card-name">
            <h2>{data.precio}</h2>
          </div>


          <div className="app-container-category-data-card-buttons">
            <ButtonModificar
              placeholder="Editar"
              handleClick={() => alert("Se edita")}
            />
            <ButtonDetalle 
              placeholder="Detalle"
              handleClick={() => alert("detalle")}
            />

            <ButtonEliminar
              placeholder="Eliminar"
              handleClick={() => alert("hola")}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

