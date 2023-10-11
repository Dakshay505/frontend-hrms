import axios from "axios";
import {
  DepartmentOverviewApiPath,
  addDepartmentApiPath,
  addParentDepartmentApiPath,
  deleteDepartmentApiPath,
  getAllDepartmentApiPath,
  getAllParentDepartmentApiPath,
  getDepartmentByParentApiPath,
  getSalaryBySubDepartmentApiPath,
  updateDepartmentApiPath,
  updateParentDepartmentApiPath,
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
export const getDepartmentoverview = async (Data:any) => {
  try {
    const { data } = await axios.get(`${DepartmentOverviewApiPath}?date=${Data}`, {
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

export const updateDepartment = async (Data: any) => {
  try {
    console.log("abcd", Data);
    const { data } = await axios.patch(
      `${updateDepartmentApiPath}/${Data.departmentId}`,
      Data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateParentDepartment = async (Data: any) => {
  try {
    console.log("abcd", Data);
    const { data } = await axios.patch(
      `${updateParentDepartmentApiPath}/${Data.departmentId}`,
      Data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    return error.response.data;
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
