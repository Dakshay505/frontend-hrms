import axios from 'axios';


// CREATE
export const uploadDocuments = async (formData: any) => {
    try{
        console.log(formData);
        const {data} = await axios.post(`/api/v1/employee/docs/upload`, formData, {headers: {
            'Content-Type': 'multipart/form-data',
        }, withCredentials:true});
        console.log("File uploaded")
        return data;
    }
    catch(err: any){
        console.log(err.response.data)
    }
};
