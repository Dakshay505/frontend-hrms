import axios from "axios";
import { updateHierarchyApiPath, updateHierarchyGroupApiPath } from "../../APIRoutes";

// update job profile
export const updateHierarchyJobProfile = async (updateData: any) => {
    try {
        console.log(updateData);
        const { data } = await axios.patch(`${updateHierarchyApiPath}`, updateData, { withCredentials: true });
        return data;
    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 404)) {
            console.log(error.response.data.message);
        } else if (error.response && error.response.data) {
            console.log(error.response.data);
        } else {
            console.log(error.toString());
        }
    }
};
// update job profile
export const updateHierarchyGroup = async (updateData: any) => {
    try {
        console.log(updateData);
        const { data } = await axios.patch(`${updateHierarchyGroupApiPath}`, updateData, { withCredentials: true });
        return data;
    } catch (error: any) {
        if (error.response && (error.response.status === 400 || error.response.status === 404)) {
            console.log(error.response.data.message);
        } else if (error.response && error.response.data) {
            console.log(error.response.data);
        } else {
            console.log(error.toString());
        }
    }
};