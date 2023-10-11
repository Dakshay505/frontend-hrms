import axios from "axios";
import { getNewSalaryApiPath,getMonthlyReportApiPath } from "../../APIRoutes";


export const getNewSalaryDataApi = async (Data:any) => {
    try {
      const {data}= await axios.post(`${getNewSalaryApiPath}`,Data, {
        withCredentials: true,
      });
      // console.log(data)
      return data;
    } catch (err: any) {
      console.log(err.data);
    }
  };

 

export const getMonthlyReportsApi = async (Data:any) => {
  console.log(Data)
  try {
      const {data}= await axios.post(`${getMonthlyReportApiPath}`,Data, {
        withCredentials: true,
      });
      return data;
    } catch (err: any) {
      console.log(err.data);
    }
  };

