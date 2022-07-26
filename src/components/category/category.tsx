//Libs
import React, { useEffect, useState } from "react";

//Components
import { NotItem } from "../notItem/notItem";

//Services
import categoryService from "../../services/category";

//Styles
import "./category.css";

export const Category: React.FC<{}> = () => {
  const [existsEntrys, setExistsEntrys] = useState<boolean>(false);

  const countCategories = async () => {
    const result = await categoryService.count();
    setExistsEntrys(result);
    console.log("Categories exists state: " + result);
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
          onSubmit={() => alert("CLICK")}
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
