import axios from "axios";
import { createLeavesAndGatePassApiPath, getAcceptedGatePassApiPath, getAcceptedLeavesApiPath, getApprovedGatePassApiPath, getApprovedLeavesApiPath, getMyLeavesAndGatepassApiPath, getPendingGatePassApiPath, getPendingLeavesApiPath, getRejectedGatePassApiPath, getRejectedLeavesApiPath, updateAcceptedGatePassApiPath, updateAcceptedLeavesApiPath, updatePendingGatePassApiPath, updatePendingLeavesApiPath } from "../../APIRoutes";
// LEAVES
// READ APPROVED LEAVES
export const getAllPendingLeaves = async () => {
  try {
    const { data } = await axios.get(`${getPendingLeavesApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ APPROVED LEAVES
export const getAllApprovedLeaves = async () => {
  try {
    const { data } = await axios.get(`${getApprovedLeavesApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ ACCEPTED LEAVES
export const getAllAcceptedLeaves = async () => {
  try {
    const { data } = await axios.get(`${getAcceptedLeavesApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ REJECTED LEAVES
export const getAllRejectedLeaves = async () => {
  try {
    const { data } = await axios.get(`${getRejectedLeavesApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// CREATE MYLEAVES LEAVES AND GATEPASS
export const createLeavesAndGatePass = async (createData: any) => {
  try {
    const { data } = await axios.post(`${createLeavesAndGatePassApiPath}`, createData, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ MYLEAVES LEAVES AND GATEPASS
export const getMyLeavesAndGatePass = async () => {
  try {
    const { data } = await axios.get(`${getMyLeavesAndGatepassApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// UPDATE PENDING LEAVES
export const updatePendingLeaves = async (updatedData: any) => {
  console.log(updatedData)
  try {
    const { data } = await axios.patch(`${updatePendingLeavesApiPath}`, updatedData,{ withCredentials: true });
    console.log("Leave data", data)
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// UPDATE REJECTED LEAVES
export const updateAcceptedLeaves = async (updatedData: any) => {
 
  try {
    const { data } = await axios.patch(`${updateAcceptedLeavesApiPath}`, updatedData,{ withCredentials: true });
     console.log(data)
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}


// GATEPASS
// READ APPROVED GATEPASS
export const getAllPendingGatePass = async () => {
  try {
    const { data } = await axios.get(`${getPendingGatePassApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ APPROVED GATEPASS
export const getAllApprovedGatePass = async () => {
  try {
    const { data } = await axios.get(`${getApprovedGatePassApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ ACCEPTED GATEPASS
export const getAllAcceptedGatePass = async () => {
  try {
    const { data } = await axios.get(`${getAcceptedGatePassApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ REJECTED GATEPASS
export const getAllRejectedGatePass = async () => {
  try {
    const { data } = await axios.get(`${getRejectedGatePassApiPath}`, { withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ PENDING LEAVES
export const updatePendingGatePass = async (updatedData: any) => {
  try {
    const { data } = await axios.patch(`${updatePendingGatePassApiPath}`, updatedData,{ withCredentials: true });
    console.log("this is data", data)
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}
// READ REJECTED LEAVES
export const updateAcceptedGatePass = async (updatedData: any) => {
  try {
    const { data } = await axios.patch(`${updateAcceptedGatePassApiPath}`, updatedData,{ withCredentials: true });
    return data;
  }
  catch (error: any) {
    console.log(error.response.data)
  }
}