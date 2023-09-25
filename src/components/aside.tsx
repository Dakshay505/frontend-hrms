import React, { useState } from "react";
import { Link } from "react-router-dom"
import logo from "../assets/meta.png"
import bellIcon from '../assets/Bell.svg'
import calendar from "../assets/calendar.png"
import dash from "../assets/dash.svg"
import doc from "../assets/doc.svg"
import leave from "../assets/airplane.svg"
import salary from "../assets/salary.svg"
import training from "../assets/video.svg"
import notification from "../assets/Bell.png"
import calenderr from "../assets/attendence.svg";
import { logoutUserAsync } from "../redux/Slice/loginSlice";
import { useDispatch, useSelector } from "react-redux";

import arrowside from "../assets/gray-left.png"
import openn from "../assets/r-arrow.png"


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
  { id: "Dashboard", name: "Dashboard", icon: dash, Link: "/" },
  { id: "Attendence", name: "Attendence", icon: calenderr, Link: "/attendance" },
  {
    id: "Leaves and Gatepass",
    name: "Leaves and Gatepass",
    icon: leave,
    Link: "/pending-leaves",
  },
  { id: "Documents", name: "Documents", icon: doc, Link: "/document" },
  { id: "Notification", name: "Notification", icon: bellIcon, Link: "/compose-notification" },
  { id: "Salaries", name: "Salaries", icon: salary, Link: "/salary-parent-department" },
  {
    id: "SalaTraining Contentries",
    name: "Training Content",
    icon: training,
    Link: "/traning-dashboard",
  },
  {
    id: "New Employee Profile",
    name: "New Employee Profile",
    icon: training,
    Link: "/new-profile-employee",
  },
];

const asideButtonCSS = `flex text-[#666] items-center font-medium gap-[8px] cursor-pointer`;

type Props = {
  children: React.ReactNode;
}

export default function aside(props: Props) {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState<string>("home");
  const [showSidebar, setShowSidebar] = useState(false);

  const loggedInUserData = useSelector((state: any) => state.login.loggedInUserData)
  return (
    // main
    <div className="flex flex-col">
      {/* nav */}
      <nav className="flex items-center fixed bg-[#FFFFFF] z-10 justify-between px-5 flex-row border w-full h-[74px]">

        <Link to='/'>
          <div className="flex items-center justify-center space-x-2 w-[196px]">
            <img src={logo} alt="logo" className="w-[32px]" />
            <h1 className="text-red text-[20px] font-medium">Chawla Ispat</h1>
          </div>
        </Link>

        <div className="flex items-center  gap-[16px]">
          {loggedInUserData.employee && (loggedInUserData?.employee.jobProfileId.jobProfileName)?.toLowerCase() === "hr" &&
            <Link to="/emphome" className="bg-[#ECEDFE] py-3 px-4 text-sm font-medium rounded-lg text-[#283093] cursor-pointer">
              <h1>Switch as Employee</h1>
            </Link>
          }
          {/* asd */}
          <div
            onClick={() => {
              window.location.replace("https://chawlacomponents.com/prd")
              // window.location.replace("http://localhost:5050/prd")
            }}
            className='flex justify-center cursor-pointer items-center  h-[40px] rounded-lg hover:text-black text-white hover:bg-white bg-[#283093] border-[#283093] border-2 py-2 px-4'>
           
            <div>
              <p className='px-2 text-[16px] leading-6 font-medium text-white hover:text-black'>Production</p>
            </div>
          </div>



          <Link to='/show-notifications'>
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
            <img src={openn} alt="" className="h-[24px] w-[24px] p-[5px] shadow-lg border rounded-full border-border-primary " />
          </button>
        ) : (
          <img src={arrowside} alt="" onClick={() => setShowSidebar(!showSidebar)}
            className="fixed h-[24px] w-[24px] p-[5px] border rounded-full border-border-primary shadow-lg  z-30 flex items-center cursor-pointer left-[258px] top-[14%]" />

        )}
        <aside className={`flex flex-col justify-between fixed mt-[32px] shadow-right-lg bg-white top-[62px] border-r w-[270px] h-[80%] ${showSidebar ? "translate-x-[-243px]" : "translate-x-0"
          } transition-all ease-in-out duration-500`}>
          <div className="flex flex-col gap-3 px-6">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.Link}
                onClick={() => setActiveItem(item.id)}
                className={`py-3 px-4 rounded-lg h-11 w-[208px] flex items-center ${activeItem === item.id ? "bg-primary-bg" : ""
                  }`}
              >
                <div
                  className={`${activeItem === item.id ? "text-blue-800" : ""} ${asideButtonCSS}`}
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
          <div className="px-6">
            <Link to="/">
              <div className="flex items-center justify-center">
                <button onClick={() => {
                  dispatch(logoutUserAsync());
                }}
                  className=" flex items-center justify-center border-primary-blue border-[1.5px] w-[208px] h-11 px-5 py-4 rounded-lg text-primary-blue text-[16px] leading-6 font-medium">
                  Logout
                </button>
              </div>
            </Link>
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