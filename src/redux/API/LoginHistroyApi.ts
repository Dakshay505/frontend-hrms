// api.js
import axios from 'axios';
import { getLoginHistroyApiPath } from '../../APIRoutes';


export const fetchLoggedInHistoryAPI = async () => {
  try {
    const {data} = await axios.get(`${getLoginHistroyApiPath}`,{
      withCredentials:true
    });
    console.log("i am api ",data)
    return data;
  } catch (error) {
    throw error;
  }
};
 