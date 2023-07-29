import { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { apiPath } from "../../APIRoutes";
import notify from "../../assets/Bell.png";
import doc from "../../assets/File.png";
import alert from "../../assets/notification.png";
import highAlert from "../../assets/warning.png";
import info from "../../assets/info.png";
import toast from 'react-hot-toast';

type NotificationData = {
  message: string;
  date: string;
  notificationType: string;
};

const NotificationList = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const user = useSelector((state: any) => state.login.loggedInUserData);
  let idd: string = "";

  if (user && user.admin) {
    idd = user.admin._id;
  } else if (user && user.employee) {
    idd = user.employee._id;
  }

  useEffect(() => {
    fetchNotifications();
    setupSocketConnection();
  }, []);

  const fetchNotifications = async () => {
    try {
      const res = await axios.get(`${apiPath}/api/v1/notifications/${idd}`);
      setNotifications(res.data.notification);
    } catch (error) {
      console.error(error);
    }
  };

  const setupSocketConnection = () => {
    const socket = io(apiPath, { query: { employeeId: idd } });

    socket.on("connect", () => {
      console.log("Connected to websocket");
    });

    socket.on("notification", (notification: any) => {
      console.log("notification.... ", notification);
      const length = notification.notification.length;
      toast.success(notification.notification[length - 1].message, {
        style: { border: '1px solid #713200', padding: '16px', color: '#713200', },
        iconTheme: { primary: '#713200', secondary: '#FFFAEE', },
      });
      setNotifications((prevNotifications) => [
        notification,
        ...prevNotifications,
      ]);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from websocket");
    });

    socket.on("error", (error: any) => {
      console.log(error.message);
    });

    return () => {
      socket.disconnect();
    };
  };

  const renderNotificationIcon = (notificationType: string) => {
    switch (notificationType) {
      case "alert":
        return (
          <img src={alert} alt="Alert" className="h-[20px] w-[20px] m-[20px]" />
        );
      case "highalert":
        return (
          <img
            src={highAlert}
            alt="High Alert"
            className="h-[20px] w-[20px] m-[20px]"
          />
        );
      case "info":
        return (
          <img src={info} alt="Info" className="h-[20px] w-[20px] m-[20px]" />
        );
      case "document":
        return (
          <img
            src={doc}
            alt="Document"
            className="h-[20px] w-[20px] m-[20px]"
          />
        );
      default:
        return (
          <img
            src={notify}
            alt="Document"
            className="h-[20px] w-[20px] m-[20px]"
          />
        );
    }
  };

  return (
    <ul>
      <div className="mx-10 w-[397px] h-auto border border-primary-border shadow-lg right-[250px]  absolute ">
        {/* <div className="mx-10  "> */}
        {notifications.map((notification, index) => (
          <div key={index}>
            <div className="flex gap-[12px] p-[16px] border border-primary-border  ">
              <div className="rounded-full bg-[#ECEDFE] flex justify-center items-center h-[40px] w-[40px]">
                {renderNotificationIcon(notification.notificationType)}
              </div>
              <div className="gap-[20px] flex flex-col">
                <p>
                  {notification.message}
                </p>
                <p>
                  Time:{" "}
                  {new Date(notification.date).toLocaleString("en-US", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ul>
  );
};

export default NotificationList;