import axios from "axios";
import {
    addTrainingDocumentApiPath,
    addTrainingLinkApiPath,
} from "../../APIRoutes";

// CREATE
export const addTrainingLinks = async (addDepartmentData: any) => {
  try {
    const { data } = await axios.post(
      `${addTrainingLinkApiPath}`,
      addDepartmentData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// CREATE
export const addTrainingDocuments = async (addDepartmentData: any) => {
  try {
    const { data } = await axios.post(
      `${addTrainingDocumentApiPath}`,
      addDepartmentData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

