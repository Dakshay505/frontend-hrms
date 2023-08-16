import axios from "axios";
import {
  addJobProfileDepartmentApiPath,
  createJobProfileApiPath,
  getJobProfileApiPath,
  getSingleJobProfileApiPath,
  updateJobProfileApiPath,
} from "../../APIRoutes";

// CREATE
export const createJobProfiles = async (jobProfileData: any) => {
  try {
    const { data } = await axios.post(
      `${createJobProfileApiPath}`,
      jobProfileData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    return err.response.data;
  }
};

export const getSingleJobProfile = async (JobprofileId: any) => {
  try {
    // console.log("id", JobprofileId.departmentId);
    const { data } = await axios.get(
      `${getSingleJobProfileApiPath}/${JobprofileId.jobProfileId}`,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// READ
export const getAllJobProfiles = async () => {
  try {
    const { data } = await axios.get(`${getJobProfileApiPath}`, {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};
export const updateJobProfile = async (jobprofileData: any) => {
  try {
    console.log("jobProfileData", jobprofileData);
    const { data } = await axios.patch(
      `${updateJobProfileApiPath}/${jobprofileData.jobProfileId}`,
      jobprofileData.data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
export const updateJobProfileDepartment = async (Data: any) => {
  try {
    const { data } = await axios.patch(
      `${addJobProfileDepartmentApiPath}`,
      Data,
      { withCredentials: true }
    );
    return data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};
