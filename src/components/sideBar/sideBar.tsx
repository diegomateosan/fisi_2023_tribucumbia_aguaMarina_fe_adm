import React, { useEffect, useState } from "react";
import { IoMdMenu, IoMdClose, IoMdPerson } from "react-icons/io";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { GrCafeteria } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { IoBarChartOutline, IoDocumentTextOutline } from "react-icons/io5";

import userService from "../../services/user";

import { Link, useNavigate } from "react-router-dom";

import "./sideBar.css";

export const NavBar: React.FC<{
  handleauth: () => void;
}> = ({ handleauth }) => {
  const [name, setName] = useState("");

  const getProfile = async () => {
    const user = await userService.showName();
    setName(user.data.name);
  };

  React.useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="app-container-navbar">
      <div className="app-container-tittle">
        <h1>Welcome, {name}</h1>
        <hr />
      </div>

      <div className="app-container-links">
        <nav>
          <div className="app-container-user">
            <IoMdPerson size={28} />
            <Link to="/user">Usuarios</Link>
          </div>

          <div className="app-container-category">
            <BsFillGrid3X3GapFill size={28} />
            <Link to="/category">Categorias</Link>
          </div>

          <div className="app-container-platillos">
            <GrCafeteria size={28} color="white" />
            <Link to="/platillo">Platillos</Link>
          </div>

          <div className="app-container-dashboard">
            <IoBarChartOutline size={28} />
            <Link to="">Dashboard</Link>
          </div>

          <div className="app-container-reportes">
            <IoDocumentTextOutline size={28} />
            <Link to="">Reportes</Link>
          </div>

          <div className="app-container-logout">
            <BiLogOut
              size={28}
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await localStorage.removeItem("token");
                  await handleauth();
                  alert("Sesión terminada");
                } catch (err) {
                  console.error(err);
                }
              }}
            />
            <p
              onClick={async (e) => {
                e.preventDefault();
                try {
                  await localStorage.removeItem("token");
                  await localStorage.removeItem("token");
                  alert("Sesión terminada");
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              Cerrar Sesión
            </p>
          </div>
        </nav>
      </div>
    </div>
  );
};
