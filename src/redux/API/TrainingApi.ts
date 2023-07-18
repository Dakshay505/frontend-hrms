import axios from "axios";
import {
    addTrainingDocumentApiPath,
    addTrainingLinkApiPath,
} from "../../APIRoutes";

// CREATE
export const addTrainingLinks = async (addGroupData: any) => {
  try {
    const { data } = await axios.post(
      `${addTrainingLinkApiPath}`,
      addGroupData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

// CREATE
export const addTrainingDocuments = async (addGroupData: any) => {
  try {
    const { data } = await axios.post(
      `${addTrainingDocumentApiPath}`,
      addGroupData,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};

