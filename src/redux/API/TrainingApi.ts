import axios from "axios";
import {
    addTrainingDocumentApiPath,
    addTrainingLinkApiPath,
    addTrainingQuizApiPath,
    addAssesmentQuizApiPath
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
// CREATE
export const addTrainingQuizApi = async (Data: any) => {
  try {
    const { data } = await axios.post(
      `${addTrainingQuizApiPath}`,
      Data,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};


// // CREATE
export const getQuizQuestions = async (jobProfileId:any) => {
  try {
    const response = await axios.post(`${addAssesmentQuizApiPath}`, { jobProfileId });
    return response.data.questions;
  } catch (error:any) {
    throw new Error(error.response.data);
  }
};
// CREATE
// export const getQuizQuestions = async (jobProfileId:any) => {
//   try {
//     const response = await axios.post(`http://localhost:5050/api/v1/quiz/getQuiz/${jobProfileId.jobProfileId}`);
//     return response.data.questions;
//   } catch (error:any) {
//     throw new Error(error.response.data);
//   }
// };


