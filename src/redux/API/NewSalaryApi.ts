import axios from "axios";
import { getNewSalaryApiPath } from "../../APIRoutes";


export const getNewSalaryDataApi = async () => {
    try {
      const response= await axios.get(`${getNewSalaryApiPath}`, {
        withCredentials: true,
      });
      console.log(response)
      return response;
    } catch (err: any) {
      console.log(err.response);
    }
  };

