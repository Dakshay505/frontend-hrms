import React, { useState, useEffect } from "react";
import right from "../../assets/r-arrow.png";
import up from "../../assets/arrow-up.png";
import axios, { AxiosResponse } from 'axios';
import { Link } from "react-router-dom";
import { getPresentNumberApiPath } from "../../APIRoutes";

interface AttendanceData {
  AbsentEmployess: string[];
  Number_Present_Employee: number;
  // Add any other properties as needed
}

export const Attendence: React.FC = () => {
  const [data, setData] = useState<AttendanceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<AttendanceData> = await axios.get(
          `${getPresentNumberApiPath}`,
          { withCredentials: true }
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        // Handle any errors
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="flex flex-col flex-start px-10 pt-[32px] ">
      <div className=" flex justify-between w-[688px] item-center">
        <div className="text-neutral-n-600 text-2xl font-inter font-bold leading-8">
          Attendance Overview
        </div>
        <Link to="/attendance-database" className="flex px-[16px] cursor-pointer py-[12px] justify-center items-center">
          <p className="text-[#666666] leading-trim font-inter text-capitalize text-lg font-medium leading-6 tracking-wider">
            See All
          </p>
          <img src={right} alt="" className="h-[16px] w-[16px]" />
        </Link>

      </div>
      <div className="flex flex-start pt-[16px] gap-[32px]">
        <div className="flex flex-col w-[250px] h-[108px] justify-center items-center gap-4 p-[24px] rounded-2xl bg-[#ECEDFE]">
          <div className="flex justify-center items-center">
            <span className="text-[#283093] text-2xl font-inter font-semibold leading-8">
              {data && data.Number_Present_Employee}
            </span>
            <img src={up} alt="" className="h-[16px] w-[16px] ms-1" />
          </div>
          <p className="text-neutral-n-600 text-lg font-inter font-medium leading-6 tracking-tighter">
            Present
          </p>
        </div>
        <div className="flex flex-col w-[250px] h-[108px] justify-center items-center gap-4 p-[24px] rounded-2xl bg-[#ECEDFE]">
          <div className="flex justify-center items-center">
            <span className="text-[#283093] text-2xl font-inter font-semibold leading-8">
              {data && data.AbsentEmployess}
            </span>
            <img src={up} alt="" className="h-[16px] w-[16px] rotate-180 ms-1" />
          </div>
          <p className="text-neutral-n-600 text-lg font-inter font-medium leading-6 tracking-tighter">
            Absent
          </p>
        </div>
      </div>
    </div>


  );
};
