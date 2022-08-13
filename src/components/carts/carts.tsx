import React, { useEffect, useState } from "react";

import categoryService from "../../services/category";
import { Category } from "../../entities/category";


export const cartsCategoria: React.FC<{
    
  }> = ({  }) => {
    const [categoryList, setcategoryList] = useState<Category[] | null >([]);

    // const MostrarImagenes =()=>{
    //   {categoryList.map((id,idx)=>{
    //     return (
    //       <div key={idx}> 
    //       {id.name}
    //        </div>

    //     )
    //   })   }
    // }
   
    useEffect(()=>{

   

    },[categoryList])

    // mapear 
    
    
    return (
      <div className="app-container-cartscategoria">
       
       
      </div>
    );
  };