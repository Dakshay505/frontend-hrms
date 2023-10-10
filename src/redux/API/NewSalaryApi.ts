import axios from "axios";
import { getNewSalaryApiPath } from "../../APIRoutes";


export const getNewSalaryDataApi = async (Data:any) => {
    try {
      const {data}= await axios.post(`${getNewSalaryApiPath}`,Data, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      console.log(err.data);
    }
  };

