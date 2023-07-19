
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import logo from "../assets/meta.png"
import bellIcon from '../assets/Bell.svg'
import calendar from "../assets/calendar.png"
import dash from "../assets/dash.svg"
import doc from "../assets/doc.svg"
import leave from "../assets/airplane.svg"
import salary from "../assets/salary.svg"
import training from "../assets/video.svg"
import calenderr from "../assets/attendence.svg";
import dot from "../assets/DotsThreeVertical.png"
import signin from "../assets/SignIn.png"
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDataAsync } from "../redux/Slice/loginSlice";
import notification from "../assets/Bell.png"

import { logoutUserAsync } from "../redux/Slice/loginSlice";
import { getEmployeeImageAsync } from "../redux/Slice/EmployeeSlice";

import arrowside from "../assets/gray-left.png"
import open from "../assets/r-arrow.png"




const getCurrentDate = () => {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);
  return formattedDate;
};

type NavItem = {
  id: string;
  name: string;
  icon: string; // Image URL or import path
  Link: string;

};

// Nav items and their links

const navItems: NavItem[] = [
  { id: "Dashboard", name: "Dashboard", icon: dash, Link: "/emphome" },
  { id: "Attendence", name: "Attendence", icon: calenderr, Link: "/empcheckin" },
  {
    id: "Leaves and Gatepass",
    name: "Leaves and Gatepass",
    icon: leave,
    Link: "/employee-leaves-home",
  },
  { id: "Documents", name: "Documents", icon: doc, Link: "/empdocuments" },
  { id: "Notification", name: "Notification", icon: bellIcon, Link: "#" },
  { id: "Salaries", name: "Salaries", icon: salary, Link: "" },
  {
    id: "SalaTraining Contentries",
    name: "Training Content",
    icon: training,
    Link: "/traning-dashboard",
  },
];

const asideButtonCSS = `flex text-[#666] items-center font-medium gap-[8px] cursor-pointer`;

type Props = {
  children: React.ReactNode
}



export default function EmployeeAside(props: Props) {

  const [activeItem, setActiveItem] = useState<string>("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch()
  const Employee = useSelector((state: any) => state.login.loggedInUserData?.employee)
  const profileData = useSelector((state: any) => state.employee.singleEmployee.profileId?.profilePicture)
  console.log("image", profileData)


  useEffect(() => {
    dispatch(getLoggedInUserDataAsync()).then((data: any) => {
      dispatch(getEmployeeImageAsync({ employeeId: data.payload.employee._id }));
    })
  }, [])

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here
  };

  const handleChangePassword = () => {
    setIsDropdownOpen(false);
  };
  
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    // main
    <div className="flex flex-col">
      {/* nav */}
      <nav className="flex items-center fixed bg-[#FFFFFF] z-10 justify-between px-5 flex-row border w-full h-[74px]">
        <Link to=''>
          <div className="flex items-center justify-center space-x-2 w-[196px]">
            <img src={logo} alt="logo" className="w-[32px]" />
            <h1 className="text-red text-[20px] font-medium">Chawla Ispat</h1>
          </div>
        </Link>

        <div className="flex items-center  gap-[16px]">
          <Link to='/employee-notifications'>
            <div>
              <img src={notification} alt="notification" className="w-[24px]" />
            </div>
          </Link>
          <div className="w-[1px] h-6 bg-primary-txt"></div>
          <img src={calendar} alt="calendar" className="w-[24px]" />
          <p>{getCurrentDate()}</p>
        </div>
      </nav>
      {/* aside */}

      <div className="">
      {showSidebar ? (
            <button
              className="flex  text-center justify-center p-[5px] text-4xl text-primary-blue items-center h-[50px] w-[50px] cursor-pointer fixed left-[22px] top-[13%] z-50 translate-x-[-20px] transition-all ease-in-out duration-500"
              onClick={() => setShowSidebar(!showSidebar)}
            >
              <img src={open} alt="" className="h-[24px]  p-[5px] w-[24px] shadow-lg border rounded-full border-border-primary " />
            </button>
          ) : (
            <img src={arrowside} alt=""  onClick={() => setShowSidebar(!showSidebar)}
            className="fixed h-[24px] w-[24px] border p-[5px]  rounded-full border-border-primary shadow-lg  z-30 flex items-center cursor-pointer left-[258px] top-[14%]"/>
           
          )}
        <aside className={`flex flex-col px-[9px] justify-between fixed mt-[32px] bg-white top-[62px] border-r w-[270px] h-[80%] ${showSidebar ? "translate-x-[-270px]" : "translate-x-0"
            } transition-all ease-in-out duration-500`}>
          <div className="flex flex-col gap-3 px-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.Link}
                className={`py-3 px-4 rounded-lg h-11 w-[208px] flex items-center ${activeItem === item.id ? "bg-primary-bg" : ""
                  }`}
              >
                <div
                  onClick={() => setActiveItem(item.id)}
                  className={`${activeItem === item.id ? "text-blue-800" : ""
                    } ${asideButtonCSS}`}

                >
                  <img
                    src={item.icon}
                    alt={item.name}
                    className={`w-5 h-5 ${activeItem === item.id ? "filter brightness-0" : ""}`}
                  />
                  <p className="whitespace-nowrap text-sm font-medium">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>


          <div className="relative flex justify-center">
            <div className="flex justify-between border border-primary-border w-[208px] h-11 bg-[#fafafa] rounded-full items-left self-stretch px-[2px] py-[6px]">
              <div className="flex items-center gap-[10px] flex-1 pr-0">
                <Link to="/emp">
                  <img src={profileData} alt="" className="w-[1.5rem] ms-2" />
                </Link>
                <div className="flex flex-col items-left justify-center gap-[4px] flex-1">
                  <p className="overflow-hidden text-[#283093] leading-[16px] text-cap leading-trim-both font-inter text-xs font-semibold tracking-[0.5px] line-clamp-1">
                    {Employee ? Employee.name : "employee"}
                  </p>
                  <p className="overflow-hidden text-[#666] truncate leading-[16px] text-cap leading-trim-both font-inter text-xs font-normal tracking-[0.5px]">
                    Production Manager
                  </p>
                </div>
              </div>
              <button
                onClick={handleDropdownToggle}
                className="outline-none focus:outline-none"
              >
                <img src={dot} alt="" className="h-[21px] w-[21px]" />
              </button>
            </div>
            {isDropdownOpen && (
              <div className="absolute -top-32 w-[189px] h-[117px] flex flex-col justify-center items-center gap-[10px] bg-white border border-primary-border rounded-[4px] shadow-md z-10">
                <Link to="/change-password"
                  onClick={handleChangePassword}
                  className="block w-full px-4 py-2 text-center text-sm underline"
                >
                  Change Password
                </Link>
                <Link to="/login" className=" flex gap-[5px] w-[125px] h-[30px] rounded-sm  items-center text-[12px] font-medium bg-primary-blue  text-white  px-6 py-3  shadow-xl" onClick={handleLogout}>
                  <img src={signin} alt="" className='h-[10px] w-[10px]' />
                  <input type='submit'
                    value="Logout"
                    className='cursor-pointer'
                    onClick={() => {
                      dispatch(logoutUserAsync());
                    }}
                  />
                </Link>
              </div>
            )}
          </div>


        </aside>
        {/* Your Content here */}
        <div className="ml-[270px] mt-[74px]">

          {props.children}
        </div>
      </div>

    </div>
  )
}
