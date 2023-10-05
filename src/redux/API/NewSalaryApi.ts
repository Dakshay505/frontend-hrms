import axios from "axios";
import { getNewSalaryApiPath } from "../../APIRoutes";


export const getNewSalaryDataApi = async (limit:any, page:any) => {
    try {
      const response= await axios.get(`${getNewSalaryApiPath}?limit=${limit}&page=${page}`, {
        withCredentials: true,
      });
      console.log(response)
      return response;
    } catch (err: any) {
      console.log(err.response);
    }
  };

