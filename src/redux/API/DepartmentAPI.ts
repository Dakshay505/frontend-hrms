import axios from "axios";
import {
  createDepartmentApiPath,
  getDepartmentApiPath,
  getSingleDepartmentApiPath,
  updateDepartmentApiPath,
} from "../../APIRoutes";

// CREATE
export const createDepartment = async (addDepartmentData: any) => {
  try {
    const { data } = await axios.post(
      `${createDepartmentApiPath}`,
      addDepartmentData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// READ
export const getAllDepartments = async () => {
  try {
    const { data } = await axios.get(`${getDepartmentApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const getSingleDepartment = async (departmentId: any) => {
  try {
    console.log("id", departmentId.departmentId);
    const { data } = await axios.get(
      `${getSingleDepartmentApiPath}/${departmentId.departmentId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const updateDepartment = async (departmentData: any) => {
  try {
    console.log("departmentData", departmentData);
    const { data } = await axios.patch(`${updateDepartmentApiPath}/${departmentData.departmentId}`,departmentData.data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
