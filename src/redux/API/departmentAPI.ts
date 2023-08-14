import axios from "axios";
import { addDepartmentApiPath, addParentDepartmentApiPath, getAllDepartmentApiPath, getAllParentDepartmentApiPath } from "../../APIRoutes";

// CREATE
export const createDepartment = async (department: any) => {
  try {
    const { data } = await axios.post(`${addDepartmentApiPath}`, department, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};
export const createParnetDepartment = async (department: any) => {
  try {
    const { data } = await axios.post(`${addParentDepartmentApiPath}`, department, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const getAllDepartment = async () => {
  try {
    const { data } = await axios.get(`${getAllDepartmentApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const getParentAllDepartment = async () => {
  try {
    const { data } = await axios.get(`${getAllParentDepartmentApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
