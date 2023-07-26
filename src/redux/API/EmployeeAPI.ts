import axios from "axios";
import {
  createEmployeeApiPath,
  getEmployeeApiPath,
  getEmployeeImageApiPath,
  getQrAssignApiPath,
  getSingleEmployeeApiPath,
  updateEmployeeApiPath,
  uploadDocumentApiPath,
  uploadImageApiPath,
} from "../../APIRoutes";

// CREATE
export const createEmployee = async (employeeData: any) => {
  try {
    const { data } = await axios.post(
      `${createEmployeeApiPath}`,
      employeeData,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
// UPDATE
export const updateEmployee = async (employeeData: any) => {
  try {
    console.log("API DATA", employeeData);
    const { data } = await axios.patch(
      `${updateEmployeeApiPath}/${employeeData.employeeId}`, employeeData.data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

function convertToQueryString(data: any) {
  let queryStr = "";
  for (let key in data) {
    if (data.hasOwnProperty(key) && data[key] !== "" && data[key] !== null) {
      if (queryStr !== "") {
        queryStr += "&";
      }
      queryStr += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
    }
  }
  return queryStr;
}
export const getAllEmployee = async (sendData: any) => {
  try {
    const queryStr = convertToQueryString(sendData);
    console.log("API", `${getEmployeeApiPath}?${queryStr}`);
    const { data } = await axios.get(`${getEmployeeApiPath}?${queryStr}`, {
      withCredentials: true,
    });
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

// READ SINGLE EMPLOYEE
export const getSingleEmployee = async (employeeId: any) => {
  try {
    const { data } = await axios.get(
      `${getSingleEmployeeApiPath}/${employeeId.employeeId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// UPDATE
export const deleteEmployee = async (employeeData: any) => {
  try {
    const { data } = await axios.delete(
      `${updateEmployeeApiPath}/${employeeData.employeeId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export const addDocuments = async (document: any) => {
  try {
    const { data } = await axios.post(`${uploadDocumentApiPath}`, document, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const addImage = async (document: any) => {
  console.log(document);
  try {
    const { data } = await axios.post(`${uploadImageApiPath}`, document, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const getEmployeeImage = async (employeeId: any) => {
  try {
    const { data } = await axios.get(
      `${getEmployeeImageApiPath}/${employeeId.employeeId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// pagination
export const pagination = async (page: any) => {
  try {
    const response = await axios.get(`${getEmployeeApiPath}?page=${page}`, {
      withCredentials: true, 
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};



// QR ASSIGN

export const getQrAssign = async (id: any) => {
  try {
    const {data} = await axios.get(`${getQrAssignApiPath}/${id}`, {
      withCredentials: true, 
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}