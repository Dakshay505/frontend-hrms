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


export const changePasswordAPI = async (employeeId: any, newPassword: any) => {
  try {
    const password  = newPassword
    console.log("employeeId : ",employeeId.employeeId, "newPassword :",password)
    const { data } = await axios.put(`${changePasswordPasswordApiPath}/${employeeId.employeeId}`,password, {
      withCredentials: true,
    });
    console.log("Data", data);

    return data;
  } catch (err: any) {
    console.error("API Error:", err);

    console.log(err.response.data);
  }
};
