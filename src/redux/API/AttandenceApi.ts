import axios from "axios";
import { getAllAttandenceApiPath, getAllTodayPunchesApiPath, getMyAttandenceApiPath, getPresentBelowApiPath, updateAttendanceApiPath } from "../../APIRoutes";


// READ
export const getAllTodayPunches = async () => {
  try {
    const { data } = await axios.get(`${getAllTodayPunchesApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// READ
export const getPresentBelow = async () => {
  try {
    const { data } = await axios.get(`${getPresentBelowApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
// post
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
export const getAllAttandence = async (sendData: any) => {
  try {
    const filterDatta = convertToQueryString(sendData);
    console.log(`${getAllAttandenceApiPath}?${filterDatta}`)
    const { data } = await axios.get(`${getAllAttandenceApiPath}?${filterDatta}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
// READ
export const getMyAttandence = async (sendData: any) => {
  try {
    const filterDatta = convertToQueryString(sendData);
    const { data } = await axios.get(`${getMyAttandenceApiPath}?${filterDatta}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// UPDATE Attendance
export const updateAttendance = async (updateData: any) => {
  try {
    console.log("updateData", updateData)
    const { data } = await axios.patch(`${updateAttendanceApiPath}`, updateData, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
