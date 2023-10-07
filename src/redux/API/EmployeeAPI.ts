import axios from "axios";
import {
  createEmployeeApiPath,
  getEmployeeApiPath,
  getEmployeeImageApiPath,
  getQrAssignApiPath,
  getSingleEmployeeApiPath,
  newPasswordApiPath,
  salaryLogApiPath,
  updateEmployeeApiPath,
  updatePasswordApiPath,
  uploadDocumentApiPath,
  uploadImageApiPath,
  getEmployeeBarcodeApiPath
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
    return error.response.data
  }
};
// UPDATE
export const updateEmployee = async (employeeData: any) => {
  try {
    const { data } = await axios.patch(
      `${updateEmployeeApiPath}/${employeeData.employeeId}`,  employeeData,
      { withCredentials: true }
      );
      console.log("employeeData", employeeData)
    return data;
  } catch (error: any) {
    return error.response.data
  }
};

// function convertToQueryString(data: any) {
//   let queryStr = '';
//   for (let key in data) {
//     if (data.hasOwnProperty(key) && data[key] !== null) {
//       const encodedKey = encodeURIComponent(key);
//       const encodedValue = encodeURIComponent(data[key]);
//       if (queryStr !== '') {
//         queryStr += '&';
//       }
//       queryStr += `${encodedKey}=${encodedValue}`;
//     }
//   }
//   return queryStr;
// }

export const getAllEmployee = async (sendData: any) => {
  try {
    //console.log("hii",sendData)
    //const queryStr = convertToQueryString(sendData);
    const { data } = await axios.post(`${getEmployeeApiPath}`, sendData,{
      withCredentials: true,
    });
    // console.log("fattttttttttttta",data)
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




// QR ASSIGN

export const getQrAssign = async (id: any) => {
  try {
    const { data } = await axios.get(`${getQrAssignApiPath}/${id}`, {
      withCredentials: true,
    });
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

export const updatePassword = async (document: any) => {
  try {
    const { data } = await axios.put(`${updatePasswordApiPath}`, document, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const newPassword = async (sendData: any) => {
  try {
    const { data } = await axios.put(`${newPasswordApiPath}`, sendData, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return err.response.data
  }
};

export const salaryLog = async (employeeId: any) => {
  try {
    const { data } = await axios.get(`${salaryLogApiPath}/${employeeId}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    return err.response.data
  }
};


// employeeBarcode
export const EmployeeBarCodes = async () => {
  try {
    const response = await axios.get(`${getEmployeeBarcodeApiPath}`, {
      withCredentials: true,
    });
    // console.log("hello i am api ",response)
    // const data = await response.data();
    return response;
  } catch (error) {
    //throw error;
  }
};