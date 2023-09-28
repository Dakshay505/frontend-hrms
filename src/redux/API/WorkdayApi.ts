import axios from "axios";
import { addWorkDayApiPath, showWorkDayApiPath, updateWorkDayApiPath } from "../../APIRoutes";


export const addWorkDay = async (Data: any) => {
    try {
        
        const response = await axios.post(`${addWorkDayApiPath}`,Data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};
export const updateWorkDay = async (Data: any) => {
    try {
        
        const response = await axios.patch(`${updateWorkDayApiPath}`,Data, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};
export const getWorkDay = async (Data: any) => {
    try {
        
        const response = await axios.get(`${showWorkDayApiPath}?year=${Data}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};
