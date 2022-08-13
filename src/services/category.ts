import axios from "axios";
import { Category } from "../entities/category";

const BASE_URL = "http://localhost:5000";

const categoryService = {
  list: async (): Promise<Category[] | null> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category/all`);
      return data.data;
    } catch (error) {
      return null;
    }
  },

  count: async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category/count`);
      return data.data;
    } catch (error) {
      return null;
    }
  },

  create: async (name: string, description: string, url: string) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/category/create`,
        method: "post",
        data: {
          name: name,
          description: description,
          url: url,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default categoryService;
