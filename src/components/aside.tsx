
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
import { useDispatch } from "react-redux";



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
  { id: "Salaries", name: "Salaries", icon: salary, Link: "" },
  {
    id: "SalaTraining Contentries",
    name: "Training Content",
    icon: training,
    Link: "",
  },
];






const asideButtonCSS = `flex text-[#666] items-center font-medium gap-[8px] px-[16px] py-[12px] cursor-pointer`;

type Props = {
  children: React.ReactNode;
}

export default function aside(props: Props) {
  const dispatch = useDispatch();
  const [activeItem, setActiveItem] = useState<string>("home");
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
          <Link to='/'>
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
                className={`p-2 rounded  flex items-center ${activeItem === item.id ? "bg-primary-bg" : ""
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
                    className={`w-[20px] h-[20px] cursor-pointer  ${activeItem === item.id ? "filter brightness-0" : ""
                      }`}
                  />
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
          <Link to="/">
            <div className="flex items-center justify-center">
              <button onClick={() => {
                dispatch(logoutUserAsync());
              }} className="border-primary-blue border w-full px-[20px] py-[16px] rounded-md text-primary-blue text-[1rem]">
                Logout
              </button>
            </div>
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
