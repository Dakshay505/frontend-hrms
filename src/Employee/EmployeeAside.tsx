
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
import img from "../assets/Ellipse 1.png"
import calenderr from "../assets/attendence.svg";
import dot from "../assets/DotsThreeVertical.png"
import signin from "../assets/SignIn.png"
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInUserDataAsync } from "../redux/Slice/loginSlice";
import notification from "../assets/Bell.png"

import { logoutUserAsync } from "../redux/Slice/loginSlice";



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
    Link: "#",
  },
];

const asideButtonCSS = `flex text-[#666] items-center font-medium gap-[8px] px-[16px] py-[12px] cursor-pointer`;

type Props = {
  children: React.ReactNode
}



export default function EmployeeAside(props: Props) {

  const [activeItem, setActiveItem] = useState<string>("home");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch()
  const Employee = useSelector((state: any) => state.login.loggedInUserData?.employee)
  useEffect(() => {
    dispatch(getLoggedInUserDataAsync())
  }, [])
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Perform logout logic here
  };

  const handleChangePassword = () => {
    // Perform change password logic here
  };
  return (
    // main
    <div className="flex flex-col w-full h-full">
      {/* nav */}
      <nav className="flex items-center fixed bg-white z-10 justify-between px-5 flex-row border w-full h-[74px]">
        <Link to='/'>
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

      <div className="flex mt-[80px]">
        <aside className="flex flex-col fixed bg-white top-[62px] px-[12px] gap-[30px] py-5 border-r w-[270px] ">

          <div className="flex flex-col gap-[8px]">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.Link}
                className={`p-2 rounded flex items-center ${activeItem === item.id ? "bg-primary-bg" : ""
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
                    className={`w-[20px] h-[20px] cursor-pointer ${activeItem === item.id ? "filter brightness-0" : ""}`}
                  />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>


          <Link to="#">
            <div className="flex justify-between border border-primary-border bg-[#fafafa] rounded-full items-left self-stretch px-[2px] py-[6px]">
              <div className="flex items-center gap-[10px] flex-1 pr-0">
                <img src={img} alt="" className="w-[32px] h-[32px]" />
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
              <div className="absolute w-[189px] h-[117px] flex flex-col justify-center items-center gap-[10px] top-[31rem] left-[3%] bg-white border border-primary-border rounded-[4px] shadow-md z-10">
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

          </Link>

        </aside>
        {/* Your Content here */}
        <div className="ml-[20%]">

        {props.children}
        </div>
      </div>

    </div>
  )
}
