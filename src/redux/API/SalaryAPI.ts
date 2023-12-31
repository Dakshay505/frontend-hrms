import axios from "axios";
import {
  getAllGroupSalaryApiPath,
  getEmployeeSalaryApiPath,
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
      console.log(data)
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
  const filterDatta = convertToQueryString({ departmentName: sendData.departmentName,date: sendData.date,nextDate:sendData.nextDate });
  try {
    const { data } = await axios.get(
      `${getSalaryBySubDepartmentApiPath}?${filterDatta}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
export const getEmployeeSalary = async (sendData: any) => {
  const filterDatta = convertToQueryString({ date: sendData.date, page: sendData.page, limit: sendData.limit, jobProfileName: sendData.jobProfileName });
  try {
    const { data } = await axios.get(
      `${getEmployeeSalaryApiPath}?${filterDatta}`,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error);
  }
};
