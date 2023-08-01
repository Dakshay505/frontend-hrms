import axios from "axios";
import { getNotificationApiPath } from "../../APIRoutes";

export const ShowNotifications = async (id:any) => {
  try {
    const employeeID = id;
    console.log(employeeID);
    const response = await axios.get(`${getNotificationApiPath}/${employeeID}`, {
      withCredentials: true,
    });
    console.log("data", response.data.notification);
    return response.data.notification;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error; 
  }
};
