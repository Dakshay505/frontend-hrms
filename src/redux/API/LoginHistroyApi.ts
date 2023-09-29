// api.js
import axios from 'axios';
import { getLoginHistroyApiPath } from '../../APIRoutes';


export const fetchLoggedInHistoryAPI = async () => {
  try {
    const {data} = await axios.get(`${getLoginHistroyApiPath}?limit=2000`,{
      withCredentials:true
    });
    console.log("i am api ",data)
    return data;
  } catch (error) {
    throw error;
  }
};
 