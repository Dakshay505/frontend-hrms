import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import { useForm } from "react-hook-form";

import FileArrowUp from "../../assets/FileArrowUp.png";
import axios from "axios";
import io from "socket.io-client";

import { toast } from "react-toastify";
import { apiPath } from "../../APIRoutes";


const ComposeNotification = () => {
  const dispatch = useDispatch();
  const groupList = useSelector(
    (state: any) => state.group.groups
  );
  const jobProfileList = useSelector(
    (state: any) => state.jobProfile.jobProfiles
  );
  const user = useSelector((state:any)=>state.login.loggedInUserData)
  let id:string = "";
  if(user && user.admin){
     id = user.admin._id
  }else if(user && user.employee){
     id = user.employee._id
  }else{
    id = ""
  }
  // const [socket, setSocket] = useState<any>(null);

  useEffect(() => { 
    dispatch(getAllGroupsAsync());
    dispatch(getAllJobProfileAsync());
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
       await axios.get(`${apiPath}/api/v1/notifications`);
      toast("Notification sent successfully",{
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      })
    } catch (error) {
      console.error(error);
    }
  };

  const { register, handleSubmit ,reset } = useForm();
  const notificationTypeList = ["High alert", "Alert", "Info"];

  const onSubmit = async (data:any) => {
    try {
      await sendNotification(data);
     reset();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  const sendNotification = async (data:any) => {
    try {
      console.log(data)
      await axios.post(`${apiPath}/api/v1/notifications`, data);
      console.log('Notification sent successfully');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  useEffect(() => {
    const newSocket = io(`${apiPath}?employeeId=${id}`);
    // setSocket(newSocket);
    
    newSocket.on('connect', () => {
      console.log("Connected to websocket");
    });

    newSocket.on('notification', (notification: string) => {
      const newNotification = JSON.parse(notification);
      console.log(newNotification)
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
    <div className="mx-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-3">
          <div className="mt-8">
            <h1 className="text-2xl font-bold text-[#2E2E2E]">
              Compose a Notification
            </h1>
          </div>
          <div className="flex gap-4 items-center">
            <p className="text-[#000000] text-[16px] leading-6 font-medium">
              For:
            </p>
            <div>
              <select
                {...register("groupName", {
                  required: true,
                })}
                defaultValue={"All Groups"}
                className="flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5"
              >
                <option value="All Groups">All Groups</option>
                {groupList &&
                  groupList.map((element: any, index: number) => {
                    return (
                      <option
                        value={element.groupName}
                        key={index}
                        className="border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2"
                      >
                        {element.groupName}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div>
              <select
                {...register("jobProfileName", {
                  required: true,
                })}
                defaultValue={"All Job Profiles"}
                className="flex border border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5"
              >
                <option value="All Job Profiles">All Job Profiles</option>
                {jobProfileList &&
                  jobProfileList.map((element: any, index: number) => {
                    return (
                      <option
                        value={element.jobProfileName}
                        key={index}
                        className="border border-solid border-[#DEDEDE] text-sm w-[320px] h-10 px-2"
                      >
                        {element.jobProfileName}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 mt-10">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-normal text-[#1C1C1C]">Text Content</p>
            </div>
            <div>
              <input
                {...register("message", { required: true })}
                type="text"
                className="border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[320px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-sm font-normal text-[#1C1C1C]">
                Notification Type
              </p>
            </div>
            <div>
              <select
                {...register("notificationType", {
                  required: "Notification Type required",
                })}
                defaultValue={"Notification Type"}
                className="border border-solid border-[#DEDEDE] text-[#666666] w-[318px] h-10 px-2"
              >
                <option value="notificationType">Notification Type</option>
                {notificationTypeList &&
                  notificationTypeList.map((element: any, index: number) => {
                    return (
                      <option
                        value={element}
                        key={index}
                        className="border border-solid border-[#DEDEDE] w-[318px] h-10 px-2"
                      >
                        {element}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <div className="flex gap-[9px]">
            <input {...register("checkBox")} type="checkbox" />
            <div>
              <p className="text-sm font-normal text-[#1C1C1C]">
                Keep it Pinned for the day
              </p>
            </div>
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4"
            >
              <img src={FileArrowUp} className="w-4" alt="" />
              <p className="px-2">Add Employee</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ComposeNotification