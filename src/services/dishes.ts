import axios from "axios";
import { DishesDefault } from "../entities/dishes";

const BASE_URL = "http://localhost:5000";

const dishesService = {
  list: async (): Promise<DishesDefault[] | null> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/dishes/all`);
      return data.data;
    } catch (error) {
      return null;
    }
  },

  count: async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/dishes/count`);
      return data.data;
    } catch (error) {
      return null;
    }
  },

  create: async (
    name: string,
    description: string,
    image: string,
    price: number,
    idcategory: number
  ) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/dishes/create`,
        method: "post",
        data: {
          name: name,
          description: description,
          image: image,
          price: price,
          idcategory: idcategory,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  edit: async (
    name: string,
    description: string,
    image: string,
    price: number,
    idcategory: number,
    id: number
  ) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/dishes/edit`,
        method: "post",
        data: {
          name: name,
          description: description,
          image: image,
          price: price,
          idcategory: idcategory,
          id: id,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  delete: async (id: number) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/dishes/delete`,
        method: "post",
        data: {
          id: id,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default dishesService;
