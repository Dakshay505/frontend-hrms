import axios from "axios";
import {
  addpuchApiPath,
  deletepuchApiPath,
  editpuchApiPath,
  getAllAttandenceApiPath,
  getGroupAttendanceApiPath,
  getMyAttandenceApiPath,
  getStaffAttendanceApiPath,
  shopFiterAttendancePath,
  updateAttendanceApiPath,
} from "../../APIRoutes";

// READ
export const getStaffAttendance = async () => {
  try {
    const { data } = await axios.get(`${getStaffAttendanceApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
// post
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
export const getAllAttandence = async (sendData: any) => {
  try {
    // const filterDatta = convertToQueryString(sendData);
    //console.log(`${getAllAttandenceApiPath}?${filterDatta}`);
    const { data } = await axios.post(
      `${getAllAttandenceApiPath}`,sendData,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const getShopFilterAttendance = async (sendData: any) => {
  try {
    
    const { data } = await axios.post(`${shopFiterAttendancePath}`,sendData,
      {
        withCredentials: true,
      }
    );
    console.log("shopFiterAttendance", data)
    return data;
  } catch (err: any) {
    console.error(err.response.data);
    throw err;
  }
};

export const getSingleGroupAttendance = async (sendData: any) => {
  try {
    const filterDatta = convertToQueryString(sendData);
    const { data } = await axios.get(
      `${getAllAttandenceApiPath}?${filterDatta}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
// READ
export const getMyAttandence = async (sendData: any) => {
  try {
    const filterDatta = convertToQueryString(sendData);
    const { data } = await axios.get(
      `${getMyAttandenceApiPath}?${filterDatta}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// READ
export const getGroupAttendance = async () => {
  try {
    const { data } = await axios.get(`${getGroupAttendanceApiPath}`, {
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
    const { data } = await axios.patch(
      `${updateAttendanceApiPath}`,
      updateData,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

export const addPunches = async (Data: any) => {
  try {
    const { data } = await axios.post(`${addpuchApiPath}/${Data.id}`, Data, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const editPunches = async (Data: any) => {
  try {
    const { data } = await axios.patch(`${editpuchApiPath}/${Data.id}`, Data, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const deletePunches = async (Data: any) => {
  try {
    const { data } = await axios.delete(
      `${deletepuchApiPath}/${Data.id}?punchsId=${Data.punchsId}`,
      {
        withCredentials: true,
      }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
