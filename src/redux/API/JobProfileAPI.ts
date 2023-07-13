import axios from "axios";
import { createJobProfileApiPath, getJobProfileApiPath } from "../../APIRoutes";

// CREATE
export const createJobProfiles = async (jobProfileData: any) => {
    try{
        console.log(jobProfileData);
        const {data} = await axios.post(`${createJobProfileApiPath}`, jobProfileData , {withCredentials:true});
        return data;
    }
    catch(err: any){
        console.log(err.response.data)
    }
}

// READ
export const getAllJobProfiles = async () => {
    try{
        const {data} = await axios.get(`${getJobProfileApiPath}`, {withCredentials:true});
        return data;
    }
    catch(err: any){
        console.log(err.response.data)
    }
}