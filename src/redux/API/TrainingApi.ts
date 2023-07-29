import axios from "axios";
import {
  addTrainingDocumentApiPath,
  addTrainingLinkApiPath,
  addTrainingQuizApiPath,
  addAssesmentQuizApiPath,
  SubmitAnswerApiPath,
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


// get quiz data
export const getQuizQuestions = async (jobProfileId: any) => {
  try {
    // console.log("jobProfileId:",jobProfileId);
    const response = await axios.post(`${addAssesmentQuizApiPath}`, { jobProfileId });
    console.log("Response data:", response.data);
    return response.data.questions;
  } catch (error: any) {
    console.log(error.response.data);
    // throw new Error('Failed to fetch quiz questions');
  }
};

 

// submit answers api
export const submitAnswers = async (Data: any) => {
  try {
    console.log(Data);
    const response = await axios.post(`${SubmitAnswerApiPath}`, Data, { withCredentials: true });
    console.log("score :", response.data);

    return response.data;
  } catch (err: any) {
    console.log(err.response.data);
  }
};





