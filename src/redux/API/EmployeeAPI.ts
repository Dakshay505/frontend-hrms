import axios from "axios";
import { createEmployeeApiPath, getEmployeeApiPath, getSingleEmployeeApiPath, updateEmployeeApiPath } from "../../APIRoutes";

// CREATE
export const createEmployee = async (employeeData: any) => {
  try {
    const { data } = await axios.post(`${createEmployeeApiPath}`, employeeData, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// UPDATE
export const updateEmployee = async (employeeData: any) => {
  try {
    console.log(employeeData)
    const { data } = await axios.patch(`${updateEmployeeApiPath}/${employeeData.employeeId}`, employeeData.data, { withCredentials: true });
    return data;
  } 
  catch (error: any) {
    console.log(error.response.data)
  }
}
 

// READ
export const getAllEmployee = async () => {
  try {
    const { data } = await axios.get(`${getEmployeeApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ SINGLE EMPLOYEE
export const getSingleEmployee = async (employeeId: any) => {
    try {
        const { data } = await axios.get(`${getSingleEmployeeApiPath}/${employeeId.employeeId}` , { withCredentials: true });
        return data;
    } catch (error) {
        console.error(error);
    }
}


// UPDATE
export const deleteEmployee = async (employeeData: any) => {
  try {
    const { data } = await axios.delete(`${updateEmployeeApiPath}/${employeeData.employeeId}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}