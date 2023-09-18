import axios from "axios";
import { addShopApiPath, getAllShopApiPath, updateShopApiPath, getSingleShopApiPath, deleteShopApiPath } from './../../APIRoutes';


export const addShop = async (addShop: any) => {
    try {
        console.log("avjcowsowsowsjows", addShop)
        const response = await axios.post(`${addShopApiPath}`, addShop, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const allShop = async () => {
    try {
        const response = await axios.get(`${getAllShopApiPath}`, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.log(error)
    }
};

export const updateShopApi = async (ShopData: any) => {
    try {
        console.log("groupData", ShopData.shopId);
        const id = ShopData.shopId
        const { data } = await axios.patch(`${updateShopApiPath}/${id}`, ShopData.data,
            { withCredentials: true }
        );
        return data;
    } catch (error: any) {
        console.log(error.response.data);
    }
};


export const getSingleShop = async (id: any) => {
    try {
        const { data } = await axios.get(
            `${getSingleShopApiPath}/${id}`,
            { withCredentials: true }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};

export const deleteShop = async (id: any) => {
    try {
        const { data } = await axios.delete(
            `${deleteShopApiPath}/${id}`,

            {
                data: { id },
                withCredentials: true
            }
        );
        return data;
    } catch (error) {
        console.error(error);
    }
};