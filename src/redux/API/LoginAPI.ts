import axios from "axios";
import { adminLoginApiPath, employeeLoginApiPath, getLoginDataApiPath, logoutApiPath } from "../../APIRoutes";


// loginApi for ADMIN
export const adminLogin = async (loginData: any) => {
  try {
    const { data } = await axios.post(`${adminLoginApiPath}`, loginData, {withCredentials: true});
    // console.log(data);
    return data;
  } catch (error:any) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      console.log(error.response.data.message);
    } else if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.toString());
    }
  }
};
// loginApi for EMPLOYEE
export const employeeLogin = async (loginData: any) => {
  try {
    const { data } = await axios.post(`${employeeLoginApiPath}`, loginData, {withCredentials: true});
    // console.log(data);
    return data;
  }catch (error:any) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      console.log(error.response.data.message);
    } else if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.toString());
    }
  }
};
// loginApi for EMPLOYEE
export const getLoggedInUserData = async () => {
  try {
    const { data } = await axios.get(`${getLoginDataApiPath}`, {withCredentials: true});
    return data;
  }catch (error:any) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      console.log(error.response.data.message);
    } else if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.toString());
    }
  }
};
// Logout 
export const logoutUser = async () => {
  try {
    const { data } = await axios.get(`${logoutApiPath}`, {withCredentials: true});
    return data;
  }catch (error:any) {
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      console.log(error.response.data.message);
    } else if (error.response && error.response.data) {
      console.log(error.response.data);
    } else {
      console.log(error.toString());
    }
  }
};
