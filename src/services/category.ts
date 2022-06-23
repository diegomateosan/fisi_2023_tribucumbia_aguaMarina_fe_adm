import axios from "axios";
import { Category } from "../entities/category";

const BASE_URL = "http://localhost:5000";

const categoryService = {
  list: async (): Promise<Category[] | null> => {
    try {
      const { data } = await axios.get(`${BASE_URL}/category/all`);
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default categoryService;
