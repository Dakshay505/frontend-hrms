import axios from "axios";
import { addShopApiPath, getAllShopApiPath } from './../../APIRoutes';


export const addShop = async (addShop:any) => {
    try {
        console.log("avjcowsowsowsjows",addShop)
        const response = await axios.post(`${addShopApiPath}`, addShop,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const allShop = async () => {
    try {
        const response = await axios.get(`${getAllShopApiPath}`,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

