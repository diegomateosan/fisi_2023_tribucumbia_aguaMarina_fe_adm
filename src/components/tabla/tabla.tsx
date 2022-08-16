import React, { useEffect, useState } from "react";

import categoryService from "../../services/category";
import { CategoryData } from "../../entities/category";
import { ButtonEliminar, ButtonModificar } from "../button/button";
import "./tabla.css";
import { useNavigate } from "react-router-dom";
import { DishesDefault } from "../../entities/dishes";
import dishesService from "../../services/dishes";
import { UserDefault } from "../../entities/User";
import userService from "../../services/user";



export const TablaUser: React.FC<{}> = () => {
    const [userList, setuserList] = useState<UserDefault[] | null>([]);
    const navigate = useNavigate();

    useEffect(() => {
        serviceUsuario();
    }, []);
  
    const serviceUsuario = async () => {
      const result = await   userService.list();
      setuserList(result);
      console.log(userList);
    };
    
    const DeleteUsuario = async (user: UserDefault) => {
        navigate("/user/delete", {
          state: {
            id: user.id,
           name: user.name,
           lastname : user.lastname,
           dni: user.dni,
           gender: user.gender,
           id_profile : user.id_profile,
           phone_number : user.phone_number,
           email :user.email

          },
        });
      };
  
    return (
      <div className="app-container-user-tabla">

                <table>
                        <thead>
                            <tr>
                                <th>ID Usuario</th>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Correo</th>
                                <th>Rol</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList?.map((data,idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{data.id}</td>
                                        <td>{data.name}</td>
                                        <td>{data.lastname}</td>
                                        <td>
                                            {data.email}
                                        </td>

                                        <td>{ data.id_profile}</td>
                                        <td className="wrapper-btns-manage">
                                            <ul className="btns-manage">
                                                <li className="btns-manage-edit" onClick={()=>DeleteUsuario(data)} >
                                                    Editar
                                                </li>

                                              
                                            </ul>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

      </div>
    );
  };
  
  