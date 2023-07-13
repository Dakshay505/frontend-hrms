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
export const postAttandenceByDate = async (date: any) => {
  try {
    const { data } = await axios.post(`${postAttandenceByDateApiPath}`, date, {
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
