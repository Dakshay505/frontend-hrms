import axios from "axios";
import { getAllTodayPunchesApiPath, getMyAttandenceApiPath, postAttandenceByDateApiPath, updateAllTodayPunchesApiPath } from "../../APIRoutes";


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
export const getMyAttandence = async () => {
  try {
    const { data } = await axios.get(`${getMyAttandenceApiPath}`, {
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
export const postAttandenceByDate = async (sendData: any) => {
  try {
    const filterDatta = convertToQueryString(sendData);
    console.log(`${postAttandenceByDateApiPath}?${filterDatta}`)
    const { data } = await axios.get(`${postAttandenceByDateApiPath}?${filterDatta}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// UPDATE
export const updateAllTodayPunches = async (updateData: any) => {
  try {
    const { data } = await axios.patch(`${updateAllTodayPunchesApiPath}`, updateData, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
