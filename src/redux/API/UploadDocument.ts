import axios from 'axios';
import { uploadDocumentApiPath, uploadEmployeeDocumentApiPath } from '../../APIRoutes';


// CREATE
export const uploadDocuments = async (formData: any) => {
    try{
        console.log(formData);
        const {data} = await axios.post(`${uploadDocumentApiPath}`, formData, {headers: {
            'Content-Type': 'multipart/form-data',
        }, withCredentials:true});
        console.log("File uploaded")
        return data;
    } 
    catch(err: any){
        console.log(err.response.data)
    }
};



export const uploadEmployeeDocuments = async (formData: any) => {
    try{
        console.log(formData);
        const {data} = await axios.post(`${uploadEmployeeDocumentApiPath}`, formData, {headers: {
            'Content-Type': 'multipart/form-data',
        }, withCredentials:true});
        console.log("File uploaded")
        return data;
    } 
    catch(err: any){
        console.log(err.response.data)
    }
};


