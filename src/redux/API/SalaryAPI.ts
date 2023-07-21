import axios from "axios";
import { getAllGroupSalaryApiPath, getSingleGroupSalaryApiPath } from "../../APIRoutes";

// READ GROUP SALARY
export const getAllGroupSalary = async () => {
    try {
        const { data } = await axios.get(`${getAllGroupSalaryApiPath}`, { withCredentials: true });
        return data;
    } catch (error: any) {
        console.log(error);
    }
};

// READ GROUP SALARY
function convertToQueryString(data: any) {
    let queryStr = '';
    for (let key in data) {
      if (data.hasOwnProperty(key) && data[key] !== '' && data[key] !== null) {
        if (queryStr !== '') {
          queryStr += '&';
        }
        queryStr += `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`;
      }
    }
    return queryStr;
  }
export const getSingleGroupSalary = async (sendData: any) => {
    const filterDatta = convertToQueryString(sendData);
    try {
        const { data } = await axios.get(`${getSingleGroupSalaryApiPath}?${filterDatta}`, { withCredentials: true });
        return data;
    } catch (error: any) {
        console.log(error);
    }
};