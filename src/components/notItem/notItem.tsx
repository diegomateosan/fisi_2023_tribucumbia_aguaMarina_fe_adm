import React from "react";
import "./notItem.css";
import { Button } from "../button/button";

export const NotItem: React.FC<{
  placeholderItem: string;
  placeholderAdv: string;
  altTittle: string;
  imgSrc: string;
  onSubmit: () => void;
}> = ({ placeholderItem, placeholderAdv, imgSrc, onSubmit, altTittle }) => {
  return (
    <div className="app-container-notItem">
      <img src={imgSrc} alt={altTittle} />
      <h2>{placeholderItem}</h2>
      <p>Haz click en el botón</p>
      <p>{placeholderAdv}</p>
      <div className="app-container-create">
        <Button handleClick={() => onSubmit()} placeholder="Create category" />
      </div>
    </div>
  );
};
