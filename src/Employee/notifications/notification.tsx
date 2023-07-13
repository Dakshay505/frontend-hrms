import { useEffect, useState } from "react";

import axios from "axios";
import io from "socket.io-client";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

type NotificationData = {
  message: string;
  notificationType: string;
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  
  // const [socket, setSocket] = useState<any>(null);
  const user = useSelector((state:any)=>state.login.loggedInUserData)
  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get("/api/v1/notifications");
      console.log("Fetched notifications data:", res.data);
      setNotifications(res.data);
    } catch (error) {
      console.error(error);
    }
  };
  let idd:string = "";
  if(user.admin){
     idd = user.admin._id
  }else if(user.employee){
     idd = user.employee._id
  }else{
    idd = ""
  }

 
  useEffect(() => {
    const newSocket = io(`?employeeId=${idd}`);
   
    
    newSocket.on('connect', () => {
      console.log("Connected to websocket");
    });

    newSocket.on('notification', (notification: string) => {
      const newNotification = JSON.parse(notification);
      toast.warn(newNotification.message);
      console.log(newNotification);
      setNotifications((prevNotifications) => [
        newNotification,
        ...prevNotifications,
      ]);
    });

    newSocket.on('disconnect', () => {
      console.log("Disconnected from websocket");
    });

    newSocket.on('error', (error: any) => {
      console.log(error.message);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <ul>
      {/* <div className="mx-10 w-[200px] h-auto shadow-lg right-[250px] p-[20px] absolute "> */}
      <div className="mx-10  ">
        {notifications.map((notification, index) => (
          <div key={index}>
            <p>{notification.message}</p>
            <p>{notification.notificationType}</p>
          </div>
        ))}
      </div>
    </ul>
  );
};

export default NotificationList;
