import axios from "axios";
import {
  addDepartmentApiPath,
  addParentDepartmentApiPath,
  deleteDepartmentApiPath,
  getAllDepartmentApiPath,
  getAllParentDepartmentApiPath,
  getDepartmentByParentApiPath,
  getSalaryBySubDepartmentApiPath,
} from "../../APIRoutes";

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
    const { data } = await axios.post(
      `${addParentDepartmentApiPath}`,
      department,
      {
        withCredentials: true,
      }
    );
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
export const getDepartmentByParent = async (Data: any) => {
  try {
    const { data } = await axios.get(
      `${getDepartmentByParentApiPath}?departmentName=${Data}`,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const getjobProfileBySubDepartmentName = async (Data: any) => {
  try {
    const { data } = await axios.get(
      `${getSalaryBySubDepartmentApiPath}?departmentName=${Data}`,
      { withCredentials: true }
    );
    console.log(data);
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const deleteDepartment = async (id: any) => {
  try {
    const { data } = await axios.delete(`${deleteDepartmentApiPath}/${id}`);
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
