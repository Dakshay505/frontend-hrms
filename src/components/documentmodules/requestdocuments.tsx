import { useForm } from "react-hook-form";
import BluePlus from '../../assets/BluePlus.png'
import FileArrowUp from '../../assets/FileArrowUp.png'
import React, {  useEffect, useState } from "react";

import glass from "../../assets/MagnifyingGlass.png";
import { useDispatch, useSelector } from "react-redux";
import { getAllGroupsAsync } from "../../redux/Slice/GroupSlice";
import { getAllJobProfileAsync } from "../../redux/Slice/JobProfileSlice";
import axios from "axios";
import { apiPath } from "../../APIRoutes";
import { io } from "socket.io-client";
import { toast } from "react-toastify";


interface LinkFormData {
    resourceName: string;
    resourceLink: string;
}


export const Requestdocument = () => {
//   const [notifications, setNotifications] = useState<Notification[]>([]);

    const dispatch = useDispatch();
    const groupList = useSelector((state: any) => state.group.groups);
    const jobProfileList = useSelector((state: any) => state.jobProfile.jobProfiles);

    useEffect(() => {
        dispatch(getAllGroupsAsync())
        dispatch(getAllJobProfileAsync())
    }, [])

    // LINK FORM CODE STARTS
    const [showLinkForm, setShowLinkForm] = useState<LinkFormData[]>([]);
    const handleLinkClick = () => {
        const newForm: LinkFormData = {
            resourceName: '',
            resourceLink: ''
        };
        setShowLinkForm([...showLinkForm, newForm]);
    }
    const handleLinkInputChange = (index: number, field: keyof LinkFormData, value: string) => {
        const updatedForms = [...showLinkForm];
        updatedForms[index][field] = value;
        setShowLinkForm(updatedForms);
    };
    console.log(showLinkForm)
    // LINK FORM CODE ENDS

    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(event.target.value);
        console.log(`Selected value: ${event.target.value}`);
        // console.log(handleChange)
    };

    // search
    const [search, setSearch] = React.useState('');

    const handleInputChange = (event:any) => {
      setSearch(event.target.value);
    };
  
    React.useEffect(() => {
      console.log(search);
    }, [search]);

    // INPUT FILES END
    const user = useSelector((state:any)=>state.login.loggedInUserData)
    let id:string = "";
    if(user && user.admin){
       id = user.admin._id
    }else if(user && user.employee){
       id = user.employee._id
    }else{
      id = ""
    }
    const onSubmit = async (data:any) => {
        try {
          await sendNotification(data);
        } catch (error) {
          console.error('Error sending notification:', error);
        }
      };
    
      const sendNotification = async (data:any) => {
        try {
          console.log(data)
          await axios.post(`${apiPath}/api/v1/notifications`, data);

          toast.success("Request for document sent successfully",{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          })
          reset();
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
    
    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    return (
        <div className="mx-10">
            <form
                onSubmit={handleSubmit((data) => {
                 
                    const sendData = {
                        groupName: data.groupName,
                        jobProfileName: data.jobProfileName,
                        message: data.resourceName + ": " + data.format,
                        notificationType: "Document"
                    }
                    console.log(sendData);
                    onSubmit(sendData);
                    
                })}>
                <div className="flex flex-col gap-3">
                    <div className="mt-8">
                        <h1 className="text-2xl font-bold text-[#2E2E2E]">Request Documents</h1>
                    </div>
                    <div className="flex gap-4 items-center">
                        <p className="text-[#000000] text-[16px] leading-6 font-bold">For:</p>
                        <div>
                            <select
                                {...register('groupName')}
                                defaultValue={""} className='flex border bg-[#fafafa] border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'>
                                <option value="">All Groups</option>
                                {groupList.map((element: any, index: number) => {
                                    return <option value={element.groupName} key={index} className='border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2'>{element.groupName}</option>
                                })}
                            </select>
                        </div>
                        <div>
                            <select
                                {...register('jobProfileName')}
                                defaultValue={""} className='flex border bg-[#fafafa] border-solid border-[#DEDEDE] rounded-lg text-sm text-[#666666] w-[176px] h-10 px-5'>
                                <option value="">All Job Profiles</option>
                                {jobProfileList.map((element: any, index: number) => {
                                    return <option value={element.jobProfileName} key={index} className='border border-solid border-[#DEDEDE] text-sm w-[324px] h-10 px-2'>{element.jobProfileName}</option>
                                })}
                            </select>
                        </div>

                        <div className="container flex justify-center gap-[5px] items-center p-[12px] rounded-full z-0 border border-solid border-primary-border focus:shadow-lg">
                                {/* <div className=" pl-[10px] top-4 pt-[5px] left-3"> */}
                                    <img src={glass} alt="" className="h-[16px] w-[16px]" />
                                {/* </div> */}
                                <input
                                    type="text"
                                    name="search" onChange={handleInputChange}

                                    placeholder="Search"
                                    className=" focus:outline-none "
                                />
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex gap-4">
                    <div onClick={handleLinkClick} className='flex items-center justify-center rounded-sm text-sm font-medium text-[#283093] py-3 px-4 border border-solid border-[#283093]'><img src={BluePlus} className='w-4' alt="" /><p className="px-2">Add a Link</p></div>

                </div>

                {/* LINK FORM START */}
                {showLinkForm && showLinkForm.map((element, index) => {
                    console.log(element)
                    return <div key={index} className='border border-solid border-[#B0B0B0] rounded-lg p-6 mt-6'>

                        <div className='flex gap-10 mx-6'>
                            <div className='flex flex-col gap-3'>
                                <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Document Name</p>
                                </div>
                                <div> 
                                    <input
                                        {...register(`resourceName`, { required: true })}
                                        onChange={(e) => handleLinkInputChange(index, 'resourceName', e.target.value)}
                                        value={element.resourceName}
                                        type="text" className='border border-solid border-[#DEDEDE] rounded py-4 px-3 h-10 w-[300px]' />
                                </div>
                            </div>
                            <div className='flex flex-col gap-3'>
                            <div>
                                    <p className='text-sm font-normal text-[#1C1C1C]'>Format</p>
                                </div>
                                <select
                                {...register("format", {required: true})}
                                    value={selectedValue}
                                    onChange={handleChange}
                                    className="border border-solid border-[#DEDEDE] rounded px-3 h-10 w-[300px]"
                                >
                                    <option value="pdf">pdf</option>
                                    <option value="jpeg">jpeg</option>
                                </select>
                            </div>
                        </div>
                    </div>
                })}
                {/* LINK FORM END */}

                <div className="mt-10">
                    <button type='submit' className='flex items-center justify-center rounded-sm text-sm font-medium bg-[#283093] text-[#FBFBFC] py-3 px-4'><img src={FileArrowUp} className='w-4' alt="" /><p className="px-2">Upload Resources</p></button>
                </div>
            </form>
        </div>
    )
}

