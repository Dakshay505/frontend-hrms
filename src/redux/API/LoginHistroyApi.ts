// API/LoginHistroyApi.js
import axios from 'axios';
import { changePasswordPasswordApiPath, getLoginHistroyApiPath } from '../../APIRoutes';

export const fetchLoggedInHistoryAPI = async (limit: any, page: any) => {
  try {
    const { data } = await axios.get(`${getLoginHistroyApiPath}?limit=${limit}&page=${page}`, {
      withCredentials: true,
    });
    // console.log("API response: ", data);
    return data;
  } catch (error) {
    throw error;
  }
};



export const changePasswordAPI = async ( employeeId:any ) => {
  try {
    console.log("employee:  ",employeeId)

    const response = await axios.put(`${changePasswordPasswordApiPath}/${employeeId.employeeId}`,  employeeId ,{
     withCredentials:true
    });
    return response;
  } catch (error:any) {
    throw error.response.data;
  }
};