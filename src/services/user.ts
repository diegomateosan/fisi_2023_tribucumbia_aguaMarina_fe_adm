import axios from "axios";
import { UserDefault } from "../entities/User";

const BASE_URL = "http://localhost:5000";

const userService = {
  register: async (
    nameValue: string,
    emailValue: string,
    passwordvalue: string,
    roleValue: string
  ): Promise<UserDefault[] | null> => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/auth/register`,
        method: "post",
        data: {
          name: nameValue,
          email: emailValue,
          password: passwordvalue,
          role: roleValue,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  login: async (emailValue: string, passwordValue: string) => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/auth/login`,
        method: "post",
        data: {
          email: emailValue,
          password: passwordValue,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },

  verify: async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/auth/verify`,
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });

      return data;
    } catch (error) {
      return false;
    }
  },

  showName: async () => {
    try {
      const { data } = await axios({
        url: `${BASE_URL}/auth/getName`,
        method: "get",
        headers: {
          token: localStorage.token,
        },
      });
      return data;
    } catch (error) {
      return null;
    }
  },
};

export default userService;
