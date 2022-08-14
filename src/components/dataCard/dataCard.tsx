import React, { useEffect, useState } from "react";

import categoryService from "../../services/category";
import { CategoryData } from "../../entities/category";

import "./dataCard.css";

export const CategoryCard: React.FC<{}> = () => {
  const [categoryList, setCategoryList] = useState<CategoryData[] | null>([]);

  useEffect(() => {
    serviceCategory();
  }, []);

  const serviceCategory = async () => {
    const result = await categoryService.list();
    setCategoryList(result);
    console.log(categoryList);
  };

  return (
    <div>
      {categoryList?.map((data, idx) => (
        <div className="app-container-category-data-card" key={idx}>
          <div className="app-container-category-data-card-name" key={idx}>
            <img src={data.image_url} alt="zzz" />
          </div>
        </div>
      ))}
    </div>
  );
};
