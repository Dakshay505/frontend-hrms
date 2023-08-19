import axios from "axios";
import {
  getAllGroupSalaryApiPath,
  getSalaryBySubDepartmentApiPath,
  getSingleGroupSalaryApiPath,
} from "../../APIRoutes";

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
// READ GROUP SALARY
export const getAllGroupSalary = async (sendData: any) => {
  const filterDatta = convertToQueryString(sendData);
  try {
    const { data } = await axios.get(
      `${getAllGroupSalaryApiPath}?${filterDatta}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

// READ GROUP SALARY
export const getSingleGroupSalary = async (sendData: any) => {
  const filterDatta = convertToQueryString(sendData);
  try {
    const { data } = await axios.get(
      `${getSingleGroupSalaryApiPath}?${filterDatta}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error);
  }
};

export const getSalaryBySubDepartment = async (sendData: any) => {
  // const filterDatta = convertToQueryString(sendData);
  try {
    console.log("sendData", sendData);
    const { data } = await axios.get(
      `${getSalaryBySubDepartmentApiPath}?departmentName=${sendData}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
